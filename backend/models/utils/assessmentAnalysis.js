import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_ELENA);

/**
 * Calls Gemini API with the category scores and returns advice/analysis string.
 * @param {Object} categoryScores - { stress: number, focus: number, positivity: number }
 * @returns {Promise<string>} The generated advice text
 */
export async function analyzeAssessment(categoryScores) {
  const { stress, focus, positivity } = categoryScores;

  // Compose prompt for Gemini
  const prompt = `
You are an expert wellness coach. Given the following category scores, provide an empathetic and insightful response **in JSON format**. The JSON should have:

- "analysis": A paragraph explaining the user's mental state based on the scores.
- "advice": 3-4 bullet points of actionable steps they can take to improve.
- "importantReminders": 2-3 short encouraging messages or affirmations.

Category Scores:
- Stress: ${stress}
- Focus: ${focus}
- Positivity: ${positivity}

Respond only in **valid JSON** format, like the example below:

{
  "analysis": "You seem to be experiencing moderate stress while maintaining a decent level of focus and positivity. This suggests you're coping well, but there might be underlying tension that needs attention.",
  "advice": [
    "Try short daily meditation sessions to lower stress.",
    "Break work into manageable chunks to improve focus.",
    "Keep a gratitude journal to reinforce positivity."
  ],
  "importantReminders": [
    "You are doing your best, and that is enough.",
    "Small steps lead to big progress."
  ]
}
`;

  try {
    const model = genAI.getGenerativeModel({ model: process.env.MODEL });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = await result.response;
    const rawText = await response.text();

    // Clean the ```json and ``` if present
    const cleanText = rawText
      .replace(/^```json\s*/, "") // remove starting ```json
      .replace(/```[\s\n\r]*$/g, '') // remove ending ```
      .trim();

    console.log(cleanText)
    const aiAnalysis = JSON.parse(cleanText);
    return aiAnalysis;
    // return text.trim();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate analysis from Gemini API.");
  }
}
