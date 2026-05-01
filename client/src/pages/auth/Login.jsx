import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance.js"
import { setCredentials } from "../../redux/slices/authSlice.js"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email: "", password: "" })
  // store form values

  const [error, setError] = useState("")
  // store error message

  const [loading, setLoading] = useState(false)
  // store loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // update only changed field
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // prevent page reload
    setLoading(true)
    setError("")

    try {
      const response = await axiosInstance.post("/auth/login", formData)
      // send login request

      dispatch(setCredentials({
        user: response.data.user,
        token: response.data.token
      }))
      // save to redux and localStorage

      const role = response.data.user.role
      if (role === "admin") navigate("/admin/dashboard")
      else if (role === "freelancer") navigate("/freelancer/dashboard")
      else navigate("/client/dashboard")
      // redirect based on role

    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong")
      // show error message
    } finally {
      setLoading(false)
      // hide loading
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4">
      {/* dark gradient background */}

      <div className="w-full max-w-md">

        {/* logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Freelance<span className="text-blue-400">Hub</span>
          </h1>
          {/* two tone logo text */}
          <p className="text-slate-400 mt-2 text-sm">
            Welcome back! Login to continue
          </p>
        </div>

        {/* card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
        {/* glassmorphism card effect */}

          {/* error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3 mb-5 text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">

            {/* email input */}
            <div className="flex flex-col gap-1">
              <label className="text-slate-400 text-xs font-medium uppercase tracking-wider">
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

            {/* password input */}
            <div className="flex flex-col gap-1">
              <label className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl p-3 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition"
              />
            </div>

            {/* submit button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white font-bold rounded-xl p-3 transition duration-200 shadow-lg shadow-blue-500/25"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* register link */}
            <p className="text-center text-slate-400 text-sm">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                Register
              </a>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login