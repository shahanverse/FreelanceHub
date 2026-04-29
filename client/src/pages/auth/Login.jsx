import { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance.js"
import { setCredentials } from "../../redux/slices/authSlice.js";

const Login = () => {
      const dispatch = useDispatch()

      const navigate = useNavigate()

      const [formData, setFormData] = useState({
            email: "",
            password: ""
            // store form input values
      })

      const [error, setError] = useState("")

      const [loading, setLoading] = useState(false)
      //store loading state


      const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
            // ...formData keeps existing values
      }


      const handleSubmit = async (e) => {
            e.preventDefault()
            //prevent page reload on form submit 

            setLoading(true)

            setError("")

            try {
                  const response = await axiosInstance.post("/auth/login", formData)
                  //send login request to backend
                  //formData has email and password

                  dispatch(setCredentials({
                        user: response.data.user,
                        token: response.data.token
                  }))

                  const role = response.data.user.role

                  if(role === "admin") {
                        navigate("/admin/dashboard")
                        //redirect admin to admin dashboard


                  }else if (role === "freelancer") {
                        navigate("/freelancer/dashboard")

                  }else {
                        navigate("/client/dashboard")
                  }
            } catch (error) {

                  setError(error.response?.data?.message || "something went wrong")
                  
            }finally {
                  setLoading(false)

                  // hide loading state whether success or error
            }
      }

      return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                              Login to FreelanceHub
                        </h2>

                        {error && (
                              <p className="text-red-500 text-sm text-center mb-4">{error}</p>

                        )}

                        <div className="flex flex-col gap-4">
                              <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleChange}
                              className="border border-gray-300 rounded-lg p-3 focus;border-blue-500"

                              />

                              <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bocer border-gray-300 rounded-lg p-3 focus:outeline-none focus:border-blue-500"
                              />

                              <button
                              onClick={handleSubmit}
                              disabled={loading}
                              className="bg-blue-500 text-white rounded-lg p-3 font-semibold hover:bg-blue-600 disabled:opacity-50"
                              >
                                    {loading ? "Loggin in..." : "Login"}

                              </button>
                              <p className="text-center" text-gray-500 text-sm>
                                    Don't have an account?{" "}
                                    <a href="/register" className="text-blue-500 hover:underline">
                                    Register
                                    </a>
                              </p>
                        </div>
                  </div>
            </div>

      )
}

export default Login