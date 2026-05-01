import { useState } from "react";

import { useNavigate} from "react-router-dom"

import axiosInstance from "../../utils/axiosInstance.js";

const Register = () => {
      const navigate = useNavigate()

      const [formData, setFormData] = useState({
            name: "",
            email: "",
            password: "",
            role: "client"
            //default role is client
      })
      const [error, setError] = useState("")

      const [loading, setLoading] = useState(false)

      const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
            //update only changed field 
      }

      const handleSubmit = async (e) => {
            e.preventDefault()

            setLoading(true)
            setError("")
            
            try {
                  const response = await axiosInstance.post("/auth/register", formData)
                  // send register request to backend 

                  navigate("/verify-otp", { state: { userId: response.data.userId }})
                  //redirect to verify otp page 

            } catch (error) {
                  setError(error.response?.data?.message || "Something went wrong")

            }finally {
                  setLoading(false)
            }
      }
      return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4">
                  <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                              <h1 className="text-4xl font-black text-white tracking-tight">
                                    Freelance<span className="text-blue-400">Hub</span>
                              </h1>
                              <p className="text-slate-400 mt-2 text-sm">
                                    Create your account to get started
                              </p>
                        </div>
                        <div className="bg-white/5 backdrop-blue-md border border-white/10 rounded-3xl p-8 shadow-2xl">
                              {error && (
                                    <div  className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3 mb-5 text-center ">
                                          {error}
                                          
                                    </div>
                                    
                              )}

                              <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1">
                                          <label className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                                                Full Name
                                          </label>
                                          <input type="text"
                                                name="name"
                                                placeholder="Shahan"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl p-3 focus:outline-none focus:bg-white/10 transition"
                                           />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                          <label className="text-slate-400 text-xs font-medium uppercase tracking-wider ">
                                                Email
                                          </label>
                                          <input
                                                type="email"
                                                name="email"
                                                placeholder="you@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl p-3 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition"

                                          />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                          <label className="text-slate-400" text-xs font-medium uppercase tracking-wider> Password</label>
                                          <input type="password"
                                                name="password"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="bg-white/5 border border-white/10 text-white placeholer-slate-500 rounded-xl p-3 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition"
                                           />
                                    </div>

                                          <div className="flex flex-col gap-1">
                                                <label className="text-slate-400 text-xs font-medium uppercase tracking-wider"> I Want to</label>
                                                <select name="role"
                                                 value={formData.role}
                                                 onChange={handleChange}
                                                 className="bg-slate-800 border border-white/10 text-white rounded-xl p-3 focus:outline-none focus:border-blue-400 transition">
                                                      <option value="client">Hire Freelancers (Client)</option>
                                                      <option value="freelancer">Work as Freelancer</option>
                                                 </select>
                                          </div>

                                          <button onClick={handleSubmit}
                                          disabled={loading}
                                          className="mt-2 bg-blue-500 hover:bg-blue-400 disabled::opacity-5- text-white font-bold rounded-xl duration-200 shadow-lg shadow-blue-500/25"
                                          
                                          >
                                                {loading ? "Creating Account..." : "Create Account"}

                                          </button>

                                          <p className="text-center text-slate-400 text-sm">
                                                Already have an account?{" "}
                                                <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                                                Login
                                                </a>
                                          </p>

                              </div>
                        </div>
                  </div>
            </div>
      )
 }

 export default Register