import mongoose from "mongoose"

const gigSchema = new mongoose.Schema({
      freelancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
      },
      title: {
            type: String, 
            required: true
      },

      description: {
            type: String, 
            required: true
      },
      category: {
            type: String,
            required: true,
            enum: [
                  "Web Development",
                  "Mobile Development",
                  "Graphic Design",
                  "Digital Marketing",
                  "Content Writing",
                  "Video Editing",
                  "UI/UX Design",
                  "Other"
            ]
      },
      price: {
            type: Number,
            required: true
      },
      deliveryDays: {
            type: Number,
            required: true
      },
      image: {
            type: String, // cloudinary url
            default: ""
      },
      rating: {
            type: Number,
            default: 0
      },
      totalReviews: {
            type: Number,
            default: 0
      },

      isActive: {
            type: Boolean,
            default: true // freelancer can deactivate gig
      },
      
}, { timestamps: true })

const Gig = mongoose.model("Gig", gigSchema)

export default Gig;