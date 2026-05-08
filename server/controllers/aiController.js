import { googleGenerativeAI } from "@google/generative-ai";

const genAi = new googleGenerativeAI(process.env.GEMINI_API_KEY);

// initialize gemini with api key

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!manage) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    // use gemini flash model - fast and free

    const prompt = `You are a helpful support assistant for FreelanceHub, 
            a freelancer marketplace platform. Help users with questions about finding freelancers. placing orders,
            managing gigs, and using the platform. keep responses short, friendly and helpful. 
            User message : ${message}`;

    // giving gemini context about my app

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({
      message: "AI error",
      error: error.message,
    });
  }
};
