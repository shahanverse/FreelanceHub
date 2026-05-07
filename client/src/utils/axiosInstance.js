import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  // base url — so we don't repeat this everywhere
})

axiosInstance.interceptors.request.use((config) => {
  // runs before every single request automatically

  const token = localStorage.getItem("token")
console.log("Sending token:", token?.slice(0, 20))
  
  // get token from browser storage

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    // attach token to request header
  }

  return config
  // send the request
})

export default axiosInstance