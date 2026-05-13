import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [message, setMessage] = useState([
    {
      role: "bot",
      text: "Hi! I'm FreelanceHub AI assistant. How can I help you today? 😊",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    setMessage((prev) => [...prev, { role: "User", text: userMessage }]);

    setLoading(true);

    try {
      const response = await axiosInstance.post("/ai/chat", {
        message: userMessage,
      });
      // send message to backend

      setMessage((prev) => [
        ...prev,
        {
          role: "bot",
          text: response.data.response,
        },
      ]);
    } catch (error) {
      console.log(error);
      
      setMessage((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I couldn't process that. Please try again!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-slate-900 border border-white/10 rounded-3xl shadow-2xl w-80 md:w-96 mb-4 overflow-hidden">
          <div className="bg-blue-500 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm">
                🤖
              </div>
              <div>
                <p className="text-white font-bold text-sm">FreelanceHub AI</p>
                <p className="text-blue-100 text-xs">Always here to help</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition text-lg"
            >
              ✕
            </button>
          </div>

          <div className="h-72 overflow-y-auto p-4 flex flex-col gap-3">
            {message.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : // user bubble — blue
                        "bg-white/10 text-slate-200 rounded-bl-none"
                    // bot bubble — dark
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-slate-400 px-4 py-2 rounded-2xl text-sm rounded-bl-none">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-3 flex gap-2">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition"
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-xl transition text-sm"
            >
              →
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-400 text-white w-14 h-14 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center text-2xl transition ml-auto"
      >
             {isOpen ? "✕" : "🤖"}
        {/* show X when open, robot when closed */}
      </button>
    </div>
  );
};

export default AIChatbot
