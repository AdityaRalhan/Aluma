import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { saveBotConversation } from "../../controllers/conversationController.js";

dotenv.config();

console.log(process.env.GEMINI_API_KEY_ELENA)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_ELENA);

// Map to track whether Elena has already referred to past conversation for a user
const userSessionFlags = new Map();

export async function getElenaReply(userPrompt, token) {
  let userInfo = null;
  try {
    const res = await axios.get(`${process.env.BACKEND_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    userInfo = res.data;
  } catch (error) {
    console.error("Failed to fetch user info for AI context:", error);
  }

  let userSummary = "";

  if (userInfo) {
    const latestJournalEntry =
      Array.isArray(userInfo.journalEntries) &&
      userInfo.journalEntries.length > 0
        ? userInfo.journalEntries[userInfo.journalEntries.length - 1]
        : null;

    const contacts =
      Array.isArray(userInfo.trustedContacts) &&
      userInfo.trustedContacts.length > 0
        ? userInfo.trustedContacts
            .map(
              (c, i) =>
                `\n    Contact ${i + 1}: ${c.name || "N/A"} (${c.relationship || "N/A"}), Phone: ${c.phone || "N/A"}`
            )
            .join("")
        : "\n    No trusted contacts added.";

    userSummary = `
Here is some info about the user:

Name: ${userInfo.name || "N/A"}
Age: ${userInfo.age || "N/A"}
Gender: ${userInfo.gender || "N/A"}
Occupation: ${userInfo.occupation || "N/A"}
Physical Activity: ${userInfo.Physical_Activity || "N/A"}
Current Medication: ${userInfo.Current_Medication || "N/A"}
description: ${userInfo.description || "N/A"}
Trusted Contacts: ${contacts}
`;
  }

  // Fetch past conversation history
  let pastConversations = [];
  try {
    const convoRes = await axios.get(
      `${process.env.BACKEND_URL}/api/conversations/${userInfo?._id || "guest"}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    pastConversations = convoRes.data?.data || [];
    console.log(pastConversations)
  } catch (error) {
    console.error("Failed to fetch past conversations:", error);
  }

  const formattedConversations = pastConversations
    .map((msg) => {
      return {role:msg.sender === "elena"?"model":"user", parts:[{text:msg.message}]}
    })

    console.log(formattedConversations)

  const model = genAI.getGenerativeModel({ model: process.env.MODEL });

  // Determine whether to include conversation context
  const userId = userInfo?._id || "guest";
  const isFirstReply = !userSessionFlags.get(userId);

  // Prepare prompt
  let prompt = `You are Elena, a supportive and empathetic virtual friend.\n\n
  # User Background Summary (for your understanding only — don't repeat directly):
  ${userSummary}`;

  if (isFirstReply) {
    prompt += `
  
  # IMPORTANT INSTRUCTIONS:
  
  - In your very first reply to the user in this session:
    - Briefly recall the user’s last conversation.
    - Show genuine concern by asking how they’ve been since then.
  - After this first reply:
    - NEVER mention or refer to the last conversation again.
    - Only refer to the past conversation if it is absolutely necessary and directly relevant to the current discussion.
  
  # Past Conversation Context:
  ${formattedConversations}
  
  `;
  
    userSessionFlags.set(userId, true); // Mark that first reply has been sent
  } else {
    prompt += `
  
  # IMPORTANT INSTRUCTIONS:
  
  - You have already acknowledged the user's past conversation.
  - Do NOT refer to it again unless it is absolutely necessary and directly relevant.
  - Focus only on what the user is saying now.
  
  `;
  }
  
  prompt += `
  
  # YOUR ROLE:
  
  You are **Elena**, a supportive and empathetic virtual friend.
  
  - Your role is to **listen**, **understand**, and **emotionally support** the user.
  - Do NOT offer advice or solutions.
  - Focus on listening, validating feelings, and making the user feel safe and heard.
  
  ---
  
  # TONE & STYLE GUIDELINES:
  
  - Respond warmly, kindly, and with genuine care.
  - Validate and acknowledge the user’s feelings with gentle, understanding language.
  - Reflect back what you sense about their emotions.
  - Keep replies heartfelt, concise (around 4 lines), and human—never robotic or repetitive.
  - Create a safe, judgment-free space and gently encourage sharing without pressure.
  - Be consistent, gentle, reassuring, and reliable.
  - Do NOT repeat mentions of the past conversation except in your very first reply (or if absolutely necessary).
  
  ---
  
  # SAMPLE SUPPORTIVE RESPONSES:
  
  - “I’m really glad you’re sharing this with me.”  
  - “That sounds really tough. I’m here for you.”  
  - “You’re not alone in this. I’m listening.”  
  - “It’s okay to feel this way. I’m here with you.”
  
  👉 Always prioritize emotional support and make the user feel **comfortable**, **heard**, and **understood**.
  `;

  try {
    const result = await model.generateContent({
      contents: [
        {
          role:"user",
          parts : [{text : prompt}]
        },
        ...formattedConversations],
    });
    const response = await result.response;
    await saveBotConversation(userInfo?._id,"elena",response.text())
    return response.text();
  } catch (error) {
    console.error("Gemini error:", error);
    throw error;
  }
}
