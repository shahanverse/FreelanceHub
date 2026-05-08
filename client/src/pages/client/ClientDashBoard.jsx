import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import axiosInstance from "../../utils/axiosInstance.js";

const ClientDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const [gigs, setGigs] = useState([]);

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [orderLoading, setOrderLoading] = useState(null);

  const [search, setSearch] = useState("")

  const [category, setCategory] = useState("")
  

  const fetchData = async () => {
    try {
      const [gigsRes, ordersRes] = await Promise.all([
        axiosInstance.get(`/gigs?search=${search}&category=${category}`),
        axiosInstance.get("/orders/client")
      ])

      setGigs(gigsRes.data.gigs)
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
  }, [search, category])

  const handlePlaceOrder = async (gig) => {
    setOrderLoading(gig._id);

    try {
      await axiosInstance.post("/orders", {
        gigId: gig._id,
        requirements: "I need this service",
      });

      alert("Order placed successfully! ✅");

      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setOrderLoading(null);
    }
  };
  const handleUpdateOrder = async (orderId, status) => {
    try {
      await axiosInstance.put(`/orders/${orderId}`, { status });
      // update order status
      fetchData();
      // refresh orders and stats
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    const getData = async () => {
      await fetchData();
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <Navbar />
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
              {
                orders.filter(
                  (o) => o.status === "pending" || o.status === "accepted",
                ).length
              }
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm ">Completed Orders</p>
            <p className="text-3xl font-black text-white mt-1">
              {orders.filter((o) => o.status === "completed").length}
            </p>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-4 mt-8">My Orders</h3>

        {orders.length === 0 ? (
          <p className="text-slate-400">No orders yet!</p>
        ) : (
          <div className="flex flex-col gap-4 mb-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
             

                  <div>
                    <p className="text-white font-bold">{order.gig?.title}</p>
                    <p className="text-slate-400 text-sm">
                      by {order.freelancer?.name}
                    </p>
                  </div>

                  {/* status badge */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      order.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : order.status === "delivered"
                          ? "bg-purple-500/20 text-purple-400"
                          : order.status === "accepted"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="text-slate-400 text-sm mb-3">
                  ${order.price} · {order.deliveryDays} days delivery
                </p>

                {/* action buttons */}
                <div className="flex gap-2">
                  {/* client can complete after freelancer delivers */}
                  {order.status === "delivered" && (
                    <button
                      onClick={() => handleUpdateOrder(order._id, "completed")}
                      className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/20 text-sm font-medium px-4 py-2 rounded-xl transition"
                    >
                      Mark Complete ✅
                    </button>
                  )}

                  {/* client can cancel pending order */}
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleUpdateOrder(order._id, "cancelled")}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-sm font-medium px-4 py-2 rounded-xl transition"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <h3 className="text-xl font-bold text-white mb-4">Available Gigs</h3>

           {/* search and filter */}
<div className="flex flex-col md:flex-row gap-3 mb-6">

  {/* search input */}
  <input
    type="text"
    placeholder="Search gigs..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    // update search state on every keystroke
    className="flex-1 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl p-3 focus:outline-none focus:border-blue-400 transition"
  />

  {/* category filter */}
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    // update category state on change
    className="bg-slate-800 border border-white/10 text-white rounded-xl p-3 focus:outline-none focus:border-blue-400 transition"
  >
    <option value="">All Categories</option>
    <option value="Web Development">Web Development</option>
    <option value="Mobile Development">Mobile Development</option>
    <option value="Graphic Design">Graphic Design</option>
    <option value="Digital Marketing">Digital Marketing</option>
    <option value="Content Writing">Content Writing</option>
    <option value="Video Editing">Video Editing</option>
    <option value="UI/UX Design">UI/UX Design</option>
    <option value="Other">Other</option>
  </select>

  {/* clear button */}
  {(search || category) && (
    <button
      onClick={() => { setSearch(""); setCategory("") }}
      // clear both search and category
      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-medium px-4 py-2 rounded-xl transition text-sm"
    >
      Clear ✕
    </button>
  )}

</div>

        {loading ? (
          <p className="text-slate-400"> Loading gigs... </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gigs.map((gig) => (
              <div
                key={gig._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition"
              >
                <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">
                  {gig.category}
                </span>

                <h4 className="text-white font-bold mt-3 mb-1">{gig.title}</h4>
                <p className="text-slate-400 text-sm mb-3">
                  by {gig.freelancer?.name}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-blue-400 font-black text-lg">
                    ${gig.price}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {gig.deliveryDays} days delivery
                  </span>
                </div>
                <button
                  onClick={() => handlePlaceOrder(gig)}
                  disabled={orderLoading === gig._id}
                  className="w-full mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl p-2 transition text-sm"
                >
                  {orderLoading === gig._id ? "Ordering..." : "Order "}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
