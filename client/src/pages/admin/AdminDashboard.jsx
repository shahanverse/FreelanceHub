import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import axiosInstance from "../../utils/axiosInstance"

const AdminDashboard = () => {
            const [stats, setStats] = useState({
                  totalUsers: 0,
                  totalGigs: 0,
                  totalOrders: 0,
                  completedOrders: 0
            })

            const [users, setUsers] = useState([])

            const [gigs, setGigs] = useState([])

            const [orders, setOrders] = useState([])

            const [loading, setLoading] = useState(true)
            const [activeTab, setActiveTab] = useState("users")

            const fetchData = async () => {
                  try {
                        const [statusRes, usersRes, gigsRes, ordersRes] = await Promise.all([
                              axiosInstance.get("/admin/stats"),
                              axiosInstance.get("admin/users"),
                              axiosInstance.get("/admin/gigs"),
                              axiosInstance.get("/admin/orders")

                              //fetch everything at once
                        ])

                        setStats(statusRes.data)
                        setUsers(usersRes.data.users)
                        setGigs(gigsRes.data.gigs)
                        setOrders(ordersRes.data.orders)
                  } catch (error) {
                        console.log(error);

                  } finally {
                        setLoading(false)
                  }
            }

            useEffect(() => {
                  const getData = async () => {
                        await fetchData()
                  }
                  getData()
            }, [])

            const handleDeleteUser = async (userId) => {
                  try {
                        await axiosInstance.delete(`/admin/users/${userId}`)
                        //delte user by id 

                        fetchData()
                  } catch (error) {
                        console.log(error);

                  }
            }

            const handleDeleteGig = async (gigId) => {
                  try {
                        await axiosInstance.delete(`/admin/gigs/${gigId}`)

                        fetchData()
                  } catch (error) {
                        console.log(error);

                  }
            }
      
      return (
            <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-950 to-slate-900">
                  <Navbar />

                  <div className="max-w-7xl mx-auto px-6 py-8">

                        <div className="mb-8">
                              <h2 className="text-3xl font-black text-white">
                                    Admin <span className="text-blue-400">Dashboard</span>
                              </h2>

                              <p className="text-slate-400 mt-1">Manage your platform</p>


                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                    <p className="text-slate-400 text-sm">Total Users</p>
                                    <p className="text-3xl font-black text-white mt-1">{stats.totalUsers}</p>
                              </div>

                              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                    <p className="text-slate-400 text-sm">Total Gigs</p>
                                    <p className="text-3xl font-black text-white mt-1">{stats.totalGigs}</p></div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                              <p className="text-slate-400 text-sm">Total Orders</p>
                              <p className="text-3xl font-black text-white mt-1">{stats.totalOrders}</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                              <p className="text-slate-400 text-sm">Completed Orders</p>
                              <p className="text-3xl font-black text-white mt-1">{stats.completedOrders}</p>
                        </div>


                        </div>



                  </div>

                  <div className="flex gap-2 mb-6 ">
                        {["users", "gigs", "orders"].map((tab) => (
                              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl text-sm font-medium transition capitalize ${activeTab === tab
                                          ? "bg-blue-500 text-white"
                                          // active tab is blue
                                          : "bg-white/5 text-slate-400 hover:bg-white/10"
                                    // inactive tab is transparent
                                    }`}>
                                    {tab}
                              </button>
                        ))}
                  </div>

                  {loading ? (
                        <p className="text-slate-400"> Lodaing... </p>
                  ) : (
                        <>
                              {activeTab === "users" && (
                                    <div className="flex flex-col gap-3">
                                          {users.map((user) => (
                                                <div key={user._id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">

                                                      <div>
                                                            <p className="text-white font-bold">{user.name}</p>
                                                            <p className="text-slate-400 text-sm">{user.email}</p>
                                                      </div>

                                                      <div className="flex items-center gap-3">
                                                            <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full capitalize">
                                                                  {user.role}
                                                            </span>

                                                            <span className={`text-xs px-3 py-1 rounded-full ${user.isVerified
                                                                        ? "bg-green-500/20 text-green-400"
                                                                        : "bg-red-500/20 text-red-400"
                                                                  }`}>
                                                                  {user.isVerified ? "Verified" : "Unverified"}
                                                            </span>

                                                            <button
                                                                  onClick={() => handleDeleteUser(user._id)}
                                                                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-medium px-3 py-1 rounded-xl transition">
                                                                  Delete
                                                            </button>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              )}

                              {activeTab === "gigs" && (
                                    <div className="flex flex-col gap-3">
                                          {gigs.map((gig) => (
                                                <div key={gig._id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">

                                                      <div>

                                                            <p className="text-white font-bold">{gig.title}</p>
                                                            <p className="text-slate-400 text-sm">
                                                                  by {gig.freelancer?.name} · ${gig.price} · {gig.deliveryDays} days
                                                            </p>
                                                      </div>

                                                      <div className="flex items-center gap-3">
                                                            <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full">
                                                                  {gig.category}
                                                            </span>

                                                            <button onClick={() => handleDeleteGig(gig._id)}
                                                                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-medium px-3 py-1 rounded-xl transition"
                                                            > Delete</button>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              )}

                              {activeTab === "orders" && (
                                    <div className="flex flex-col gap-3">
                                       {orders.map((order) => (
                                                <div key={order._id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                                      <div className="flex items-center justify-between">
                                                            <div>
                                                                  <p className="text-white font-bold">{order.gig?.title}</p>
                                                                  <p className="text-slate-400 text-sm">
                                                                        Client: {order.client?.name} → Freelancer: {order.freelancer?.name}
                                                                  </p>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                  <span className="text-blue-400 font-black ">${order.price}</span>

                                                                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${order.status === "completed" ? "bg-green-500/20 text-green-400" :
                                                                              order.status === "accepted" ? "bg-blue-500/20 text-blue-400" :
                                                                                    order.status === "delivered" ? "bg-purple-500/20 text-purple-400" :
                                                                                          "bg-yellow-500/20 text-yellow-400"
                                                                        }`}>
                                                                        {order.status}
                                                                  </span>
                                                            </div>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              )}
                        </>
                  )}


            </div>
      )
}

export default AdminDashboard
