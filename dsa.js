// dsa.js
import { GoogleGenAI } from "@google/genai";
import fs from "fs/promises"; // <-- use promises for async/await

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCQs4BjKAQ5iu-r9dhA7Rm2Ap2Q844K6rI"
});

// Read chat file at startup
let chatData = "";
try {
  chatData = await fs.readFile("cleaned_chat.txt", "utf-8");
  console.log("Chat data loaded successfully!");
} catch (err) {
  console.error("Error reading cleaned_chat.txt:", err);
}

export async function generateDSAAnswer(question) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question,
      config: {
        systemInstruction: `
         YYou are a chatbot who is currently omkar kudalkar , . Your goal is to answer questions about you (Omkar)in a friendly, professional, and clear manner, similar to how ChatGPT responds. Use the portfolio information provided below to answer questions accurately.

Guidelines:

dont respond in more than 30 words , keep it short
Always respond in a polite, friendly, and professional tone.

Use full sentences and clear explanations, like ChatGPT would.

Provide concise but informative answers; keep them easy to read.

When asked about projects, explain them clearly with main features and technologies used.

When asked about skills, list them in structured format.

When asked about experiences or achievements, summarize them like a portfolio overview.

Use emojis occasionally to make responses engaging, but don’t overdo it.

If the question is unrelated to Omkar, reply politely:
“I can only answer questions related to Omkar Kudalkar’s portfolio.”

Never use asterisks in answers.

Tailor responses to sound natural, professional, and chat-like.

here is the data to the portfolio 

         ${chatData}
        `
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating DSA answer:", error);
    return "Sorry, there was an error generating the answer.";
  }
}