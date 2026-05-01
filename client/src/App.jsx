import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
// BrowserRouter enables routing in React 
// Routes wraps all Route components
// Route defines each page path

const App = () => {
  return (
   <BrowserRouter>

   <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
