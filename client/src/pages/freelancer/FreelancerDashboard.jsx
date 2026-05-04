import { useActionState, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Navbar from "../../components/Navbar"
import axiosInstance from "../../utils/axiosInstance.js"

const FreelancerDashboard = () => {

  const {user} = useSelector((state) => state.auth)
  const [gigs, setGigs] = useState([])
  const [order, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreategig, setShowCreateGig] = useState(false)

  const [gigForm., setGigForm] = useState ({
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
      const myGigs = gigsRes.data.gigs.filter(
        (gig) => gig.freelancer?._id === user?._id ||
        gig.freelancer === user?.id 
      )

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



  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center'>
       <h1 className="text-4xl font-black text-white">
        Freelancer <span className="text-blue-400">Dashboard</span>
      </h1>
    </div>
  )
}

export default FreelancerDashboard
