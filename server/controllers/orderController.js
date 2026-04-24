import Order from "../model/Order.js";
import Gig from "../model/Gig.js";

// place order - only client

export const placeOrder = async (req , res) => {
      try {
            const { gigId, requirements} = req.body

            //find the gig

            const gig = await Gig.findById(gigId)

            if(!gig) {
                  return res.status(404),json({
                        message: "Gig not found"
                  })
            }

            // client cannot order their own gig

            if (gig.freelancer.toString() === req.user.userId) {
                  return res.status(400).json({
                        message: "You cannot order your own gig"
                  })
            }

            // create order 

            const order = await Order.create({
                  gig: gigId,
                  client: req.user.userId,
                  freelancer: gig.freelancer,
                  price: gig.price,
                  deliveryDays: gig.deliveryDays,
                  requirements

            })

            res.status(201).json({
                  message: "Order placed successfully ✅",
                  order
            })
      } catch (error) {
            res.status(500).json({
                  message: "Server error",
                  error: error.message
            })
      }
}

// get my orders - client sees their own orders

export const getClientOders = async (req, res) => {
      try {
            const orders = await Order.find({ client: req.user.userId })
            .populate("gig", "title image price")
            .populate("freelancer", "name email profilepicture")

            res.status(200).json({ orders })
      } catch (error) {
            res.status(500).json({
                  message: "Server error",
                  error: error.message
            })
      }
}

// get my order - freenlancer sees their orders

export const getFreelancerOrders = async (req, res) => {
      try {
            const orders = await Order.find({ freelancer: req.user.userId })
            .populate("gig", "title image price")
            .populate("client", "name email profilepicture")

            res.status(200).json({
                  orders
            })
      } catch (error) {
            res.status(500).json({
                  message: "Server error",
                  error: error.message
            })
      }
}

//update order status

export const updateOrderStatus = async (req, res) => {
      try {
            const { status } = req.body
            const order = await Order.findById(req.params.id)

            if(!order) {
                  return res.status(404).json({
                        message: "Order not found"
                  })
            }

            // only freelancer can accept or deliver
            if (status === "accepted" || status === "delivered") {
                  if (order.freelancer.toString() !== req.user.userId) {
                        return res.status(403).json({
                              message: "Not authorized"
                        })
                  }
            }

            //only client can complete or cancel
            if (status === "completed" || status === "cancelled") {
                  if (order.client.toString() !== req.user.userId) {
                        return req.status(403).json({
                              message: " Not authorized "
                        })
                  }
            }

            order.status = status 
            await order.save()

            res.status(200).json({
                  message: "Order status updated ✅",
                  order
            })
            
      } catch (error) {
            req.status(500).json({
                  message: "Server error" ,
                  error: error.message
            })
      }
}