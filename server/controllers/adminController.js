import User from "../model/User.js"
import Order from "../model/Order.js"
import Gig from "../model/Gig.js"


// Get all users - only admin

export const getAllUsers = async (req, res) => {
      try {
            //find all users except admin
            //-password mean don't send password field

            const users = await User.find({ role: { $ne: "admin" } }).select("-password")
            // $ne means " not equal" -skip admin users 

            res.status(200).json({ users })
      } catch (error) {
            res.status(500).json({
                  message: "Server error",
                  error: error.message
            })
      }
}

//delete user

export const deleteUser = async (req, res) => {
      try {
            // req.params.id gets user id from URL

            const user = await User.findById(req.params.id)
            //find user by id 

            if (!user) {
                  return res.status(404).json({
                        message: "User not found"
                  })
            }

            //delete user from database
            await User.findByIdAndDelete(req.params.id)

            res.status(200).json({
                  message: "User deleted successfully ✅"
            })
      } catch (error) {
            res.status(500).json({
                  message: "Server error",
                  error: error.message
            })
      }
}

// get all Orders

export const getAllOrders = async (req, res) => {
      try {
            const orders = await Order.find()
            .populate("gig", "title price")
            //show gig title and price
            .populate("client", "name email")
            //show client name and email
            .populate("freelancer", "name email")
            // show freelancer name and email

            res.status(200).json({ orders })
      } catch (error) {
            res.status(500).json({
                  message: "Server error" ,
                  error: error.message
            })
      }
}

// Get all gigs

export const getAllGigs = async (req, res) => {
      try {
            const gigs = await Gig.find()
            .populate("freelancer", "name email")

            res.status(200).json({ gigs })
      } catch (error) {
            res.status(500).json({
                  message: "Server error",
                  error: error.message
            })
      }
}

// delete Gig 

export const deleteGig = async (req, res ) => {
      try {
            const gig = await Gig.findById(req.params.id)
            //find gig by id from url

            if (!gig) {
                  return res.status(404).json({
                        message: "Gig not found"
                  })
            }

            await Gig.findByIdAndDelete(req.params.id)

            //delete gig form database

            res.status(200).json({
                  message: "Gig deleted successfully ✅"
            })
      } catch (error) {
            res.status(500).json({
                  message: "Server error",
                  error: error.message
            })
      }
}

// Get dashBoardStatus Stats

export const getDashBoardStats = async (req, res) => {
      try {
            const totalUsers = await User.countDocuments({ role: {$ne: "admin"}})
            // count all users except admin

            const totalGigs = await Gig.countDocuments()
            // count all gigs

            const totalOrders = await Order.countDocuments()
            //count all orders

            const completedOrders = await Order.countDocuments({ status: "completed" })
            // count only completed orders

            res.status(200).json({
                  totalUsers,
                  totalGigs,
                  totalOrders,
                  completedOrders
                  //send all stats to frontend
            })
      } catch (error) {
            res.status(500).json({
                  message: "Server error",
                  error: error.message
            })
      }
}