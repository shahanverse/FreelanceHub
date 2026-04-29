import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
// BrowserRouter enables routing in React 
// Routes wraps all Route components
// Route defines each page path

const App = () => {
  return (
   <BrowserRouter>

   <Routes>
    <Route path="/login" element={<Login/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
