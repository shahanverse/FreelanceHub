import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Navbar from "../../components/Navbar"
import axiosInstance from "../../utils/axiosInstance.js"


const ClientDashboard = () => {
  const { user } = useSelector((state) => state.auth)

  const [gigs, setGigs] = useState([])

  const [orders, setOrders] = useState([])

  const [loading, setLoading] = useState(true)

  

  const fetchData = async () => {
    try {
      const [gigsRes, orderRes] = await Promise.all([
        axiosInstance.get("/gigs"),
        axiosInstance.get("/orders/client")
      ])
      setGigs(gigsRes.data.gigs)
      setOrders(orderRes.data.orders)

    } catch (error) {
      console.log(error);
      
    }finally {
      setLoading(false)
    }
  }
useEffect(() => {
  const getData = async () => {
    await fetchData()
  }
    getData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white ">
            Welcome back, <span className="text-blue-400">{user?.name}!</span>
          </h2>
          <p className="text-slate-400 mt-1">
            Find the perfect freelancer for your project 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Active Orders</p>
          <p className="text-3xl font-black text-white mt-1">
            {orders.filter(o => o.status === "pending" || o.status === "accepted").length}
          </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm ">Completed Orders</p>
            <p className="text-3xl font-black text-white mt-1">
              {orders.filter(o => o.status === "completed").length}
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-4">Available Gigs</h3>

        {loading ? (
          <p className="text-slate-400"> Loading gigs... </p>       
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gigs.map((gig) => (
              <div key={gig._id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition">
                <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">
                {gig.category}</span>

                <h4 className="text-white font-bold mt-3 mb-1">
                  {gig.title}
                </h4>
                <p className="text-slate-400 text-sm mb-3">
                  by { gig.freelancer?.name}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-blue-400 font-black text-lg">
                    ${gig.price}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {gig.deliveryDays} days delivery
                  </span>
                </div>
                <button className="w-full mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl p-2 transition text-sm">
                  Order Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


export default ClientDashboard