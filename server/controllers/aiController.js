import { GoogleGenerativeAI } from "@google/generative-ai";

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    console.log("CURRENT KEY:", process.env.GEMINI_API_KEY);

    const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    

    const model = genAi.getGenerativeModel({
    model: "models/gemini-2.5-flash-lite",
    });

    const result = await model.generateContent(message);

    const response = await result.response.text();

    res.status(200).json({ response });

  } catch (error) {
    console.log("GEMINI ERROR:", error);

    res.status(500).json({
      message: "AI error",
      error: error.message,
    });
  }
};