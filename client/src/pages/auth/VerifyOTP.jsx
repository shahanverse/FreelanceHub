import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axiosInstance from "../../utils/axiosInstance.js";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await axiosInstance.post("/auth/verify-otp", { userId, otp });

      setSuccess("Email verified successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Freelance <span className="text-blue-400">Hub</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Enter the OTP sent to your email
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3 mb-5 text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green500/20 text-green-400 text-sm rounded-xl p-3 mb-5 text-center">
              {success}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <label className="text-slate-400 text-xs font-medium uppercase tracking-wider">
              OTP Code
            </label>
            <input
              type="text"
              placeholder="Enter 6 digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="bg-white/5 border border/white/10 text-white placeholder-slate-500 rounded-xl p-3 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition text-center text-2xl tracking-widest"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex text-center mt-2 bg-blue-500 hover:bg-blue-400 diabled:opacity-50 text-white font-bold rounded-xl p-3 transition duration-200 shadow-lg shadow-blue-500/25 "
          >
            {loading ? "verifying..." : "verify OTP"}
          </button>

          <p className="text-center text-slate-400 text-sm">
            Didn't receive OTP?{" "}
            <a
              href="/register"
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Register again
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP
