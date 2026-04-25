import mongoose from "mongoose" 

const reviewSchema = new mongoose.Schema({

      gig: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gig",
            required: true
            // which gig is being reviewed
      },

      client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
            // who is leaving the review
      },
      
      rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
            //rating between 1 and 5 stars
      },

      comment: {
            type: String,
            required: true
            //written review text
      }
}, { timestamps: true })

const Review = mongoose.model("Review", reviewSchema)

export default Review;