import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import VerifyOTP from "./pages/auth/VerifyOTP"
// BrowserRouter enables routing in React 
// Routes wraps all Route components
// Route defines each page path

const App = () => {
  return (
   <BrowserRouter>

   <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/verify-otp" element={<VerifyOTP/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
