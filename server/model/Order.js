import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({

      gig:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gig",
            required: true
      },
      client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
      },
      
      freelancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true

      },
      price: {
            type: Number,
            required: true
      },
      deliveryDays: {
            type: Number,
            required: true
      },
      status: {
            type: String,
            enum: ["pending", "accepted", "delivered", "completed", "cancelled"],
            default: "pending"
      },
      deliveryFile: {
            type: String,  // cloudinary url
            default: ""
      },
      requirements: {
            type: String,  // client explains what they need
            default: ""
      }
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema)

export default Order