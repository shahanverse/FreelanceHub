import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Navbar from "../../components/Navbar"
import axiosInstance from "../../utils/axiosInstance.js"
import AIChatbot from "../../components/AIChatbot.jsx"

const FreelancerDashboard = () => {

  const {user} = useSelector((state) => state.auth)
  const [gigs, setGigs] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreategig, setShowCreateGig] = useState(false)

  const [gigForm , setGigForm] = useState ({
    title: "",
    description: "",
    category: "Web Development",
    price: "",
    deliveryDays: ""
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const fetchData = async () => {
    try {
      const [gigRes, ordersRes] = await Promise.all([
        axiosInstance.get("/gigs"),
        axiosInstance.get("/orders/freelancer")
      ])
      const myGigs = gigRes.data.gigs.filter((gig) => {
  const freelancerId = gig.freelancer?._id || gig.freelancer
  const userId = user?.id || user?._id
  // check both id and _id because redux might save either one
  return freelancerId?.toString() === userId?.toString()
})


      setGigs(myGigs)
      setOrders(ordersRes.data.orders)
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

  const handleGigChange = (e) => {

    setGigForm({ ...gigForm, [e.target.name]: e.target.value })
  }

  const handleCreateGig = async () => {
    setError("")
    setSuccess("")

    try {
      await axiosInstance.post("/gigs", gigForm)

      setSuccess("Gig created successflly! ✅")
      setShowCreateGig(false)

      setGigForm({
        title: "",
        description: "",
        category: "web Development",
        price: "",
        deliveryDays: ""
        // reset form
      })
      fetchData()

    } catch (error) {
      setError(error.response?.data?.message || "Somethign went wrong")
    }
  }
  const handleDeleteGig = async (gigId) => {
    try {
      await axiosInstance.delete(`/gigs/${gigId}`)
    //delete gig by id
    fetchData()
    //refresh gigs list
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleUpdateOrderSattus = async (orderId, status) => {
    try {
      await axiosInstance.put(`/orders/${orderId}`, { status })
      //update order status

      fetchData()
    } catch (error) {
      console.log(error);
      
    }
  }



  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900'>
       <Navbar/>

       <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-black text-white">
            Welcome, <span className="text-blue-400">{user?.name}!</span>
          </h2>
          <p className="text-slate-400 mt-1">
            Manage your gigs and orders
          </p>

          

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-slate-400 text-sm">My Gigs</p>
            <p className="text-3xl font-black text-white mt-1">{gigs.length}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Active Orders</p>
            <p className="text-3xl font-black text-white mt-1">
              {orders.filter(o => o.status === "pending" || o.status === "accepted").length}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Completed Orders</p>
            <p className="text-3xl font-black text-white mt-1">
              {orders.filter(o => o.status === "completed").length}
            </p>
          </div>

       </div>

       <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">My Gigs</h3>
        <button onClick={() => setShowCreateGig(!showCreategig)}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 py-2 rounded-xl transition text-sm shadow-lg shadow-blue-500/25">
            {showCreategig ? "Cancel" :"+ Create Gig"}
          </button>
       </div>

       {showCreategig && (
         <div className="bg/white/5 border border-white/10 rounded-2xl p-6 mb-6">

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3 mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-xl p-3 mb-4">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-slate-400 text-xs uppercase tracking-wider">Title</label>
              <input type="text"
                name="title"
                placeholder="I Will build a React website"
                value={gigForm.title}
                onChange={handleGigChange}
                className="bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl p-3 focus:outline-none focus:border-blue-400 transition"
                
                />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-slate-400 text-xs uppercase tracking-wider">Category</label>
              <select name="category" 
              value={gigForm.category}
              onChange={handleGigChange}
              className="bg-slate-800 border border-white/10 text-white rounded-xl p-3 focus:outline-none focus:border-blue-400 transition"
              >

                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Video Editing">Video Editing</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-slate-400 text-xs uppercase tracking-wider">Price ($)</label>
              <input type="number"
              name="price"
              placeholder="50"
              value={gigForm.price}
              onChange={handleGigChange}
              className="bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl p-3 focus:outline-none focus:border-blue-400 transition" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-slate-400 text-xs uppercase tracking-wider">Delivery Days</label>
              <input type="number"
              name="deliveryDays"
              placeholder="3"
              value={gigForm.deliveryDays}
              onChange={handleGigChange}
              className="bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl p-3 focus:outline-none focus:border-blue-400 transition" />
            </div>

            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-slate-400 text-xs uppercase tracking-wider">Description</label>
              <textarea name="description"
              placeholder="Describe your service..."
              value={gigForm.description}
              onChange={handleGigChange}
              rows={3}
              className="bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl p-3 focus:outline-none focus:border-blue-400 transition resize-none"
              
              
              />
            </div>
          </div>

          <button onClick={handleCreateGig} className="mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-2 rounded-xl transition shadow-lg shadow-blue-500/25">
          Create Gig</button>
        </div>
       )}

       {loading ? (
         <p className="text-slate-400">Loading...</p>
        ): gigs.length === 0 ? (
          <p className="text-slate-400">No gigs yet - create your first gig</p>
        ): (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {gigs.map((gig) => (
            <div key={gig._id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">
              {gig.category} 
              </span>
              <h4 className="text-white font-bold mt-3 mb-1">{gig.title}</h4>
                <p className="text-slate-400 text-sm mb-3">{gig.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-blue-400 font-black text-lg">${gig.price}</span>
                  <span className="text-slate-400 text-xs">{gig.deliveryDays} days</span>
                </div>

                 <button
                  onClick={() => handleDeleteGig(gig._id)}
                  className="w-full mt-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-medium rounded-xl p-2 transition text-sm"
                  >
                  Delete Gig
                </button>
            </div>
          ))}
        </div>
       )}

       <h3 className="text-xl font-bold text-white mb-4">My Orders</h3>

       {orders.length === 0 ? (
         <p className="text-slate-400" > No orders yet !</p>
        ): (
          <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">

                <div>
                  <p className="text-white font-bold">{order.gig?.title}</p>
                  <p className="text-slate-400 text-sm"> by {order.client?.name}</p>
                </div>

                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  order.status === "completed" ? "bg-green-500/20 text-green-400" :
                  order.status === "accepted" ? "bg-blue-500/20 text-blue-400" :
                  order.status === "delivered" ? "bg-purple-500/20 text-purple-400" :
                  "bg-yellow-500/20 text-yellow-400"
                  // different color for each status
                }`}>
                    {order.status}
                  </span>
              </div>

              <p className="text-slate-400 text-sm mb-3">
                Requirements: {order.requirements}
              </p>

              <div className="flex gap-2">
                {order.status === "pending" && (
                  <button onClick={() => handleUpdateOrderSattus(order._id, "accepted")}
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/20 text-sm font-medium px-4 py-2 rounded-xl transition">
                    Accept Order
                  </button>
                )}

                {order.status === "accepted" && (
                  <button onClick={() => handleUpdateOrderSattus(order._id, "delivered")}
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/20 text-sm font-medium px-4 py-2 rounded-xl transition"
                  >
                                          Mark Delivered
                                        </button>
                )}
              </div>
            </div>
          ))}
        </div>
       )}
       
       </div>
       <AIChatbot/>
    </div>
  )
}

export default FreelancerDashboard
