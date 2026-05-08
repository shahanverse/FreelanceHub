import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import VerifyOTP from "./pages/auth/VerifyOTP"
import AdminDashboard from "./pages/admin/AdminDashboard.jsx"
import FreelancerDashboard from "./pages/freelancer/FreelancerDashboard.jsx"
import ClientDashboard from "./pages/client/ClientDashBoard.jsx"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home.jsx"
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

    <Route path="/admin/dashboard" element={
      <ProtectedRoute allowedRoles={["admin"]} >
        <AdminDashboard /> 

      </ProtectedRoute>
    } />

    <Route path="/freelancer/dashboard" element={
      <ProtectedRoute allowedRoles={["freelancer"]}>
        <FreelancerDashboard/>

      </ProtectedRoute>
    } />

    <Route path="/client/dashboard" element={
      <ProtectedRoute allowedRoles={["client"]}>
        <ClientDashboard/>
      </ProtectedRoute>
    }/>

    <Route path="/admin/dashboard" element={
  <ProtectedRoute allowedRoles={["admin"]}>
    <AdminDashboard />
  </ProtectedRoute>
} />

    <Route path="/" element={<Home/>}/>
   </Routes>
   </BrowserRouter>

   
  )
}

export default App
