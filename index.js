import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { generateDSAAnswer } from "./dsa.js"; // your Gemini code

const app = express();
const PORT = 3000; // or any port you prefer

// Middleware
app.use(cors({
  origin:[ "http://localhost:5173","https://portfolio-backend-sovq.onrender.com" ]// replace with your React frontend URL
}));
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("Omkar Bot backend is running!");
});

// Main POST route to handle questions
app.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "No question provided" });
  }

  try {
    const answer = await generateDSAAnswer(question);
    res.json({ answer });
  } catch (error) {
    console.error("Error generating AI answer:", error);
    res.status(500).json({ answer: "Sorry, there was an error generating the answer." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Omkar Bot backend running on http://localhost:${PORT}`);
});