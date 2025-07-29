import mongoose from "mongoose";
import Conversation from "../models/Conversation.js";

// Save a new conversation message
export const saveConversation = async (req, res) => {
  const { userId, sender, message } = req.body;
  console.log("Saving message:", { userId, sender, message });

  // Validate sender
  const validSenders = ["user", "elena", "jess"];
  if (!validSenders.includes(sender)) {
    return res.status(400).json({
      success: false,
      error: "Invalid sender. Must be 'user', 'elena', or 'jess'.",
    });
  }

  // Validate userId format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, error: "Invalid userId format." });
  }

  try {
    const newMessage = await Conversation.create({
      userId,
      sender,
      message,
    });

    res.status(201).json({ success: true, data: newMessage });
  } catch (err) {
    console.error("Error saving conversation:", err);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};

export const saveBotConversation = async (userId,sender,message) => {
  try {
    const newMessage = await Conversation.create({
      userId,
      sender,
      message,
    });

    await newMessage.save()

  } catch (err) {
    console.error("Error saving conversation:", err);
  }
};


// Get all conversation messages by user
export const getConversationsByUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, error: "Invalid userId format." });
  }

  try {
    const messages = await Conversation.find({ userId }).sort({ timestamp: 1 });

    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    console.error("Error fetching user conversations:", err);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};
