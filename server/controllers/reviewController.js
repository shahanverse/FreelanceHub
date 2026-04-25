import Review from "../model/Review.js";
import Gig from "../model/Gig.js"
import Order from "../model/Order.js"

// add review - only client 

export const addReview = async (req , res) => {
      try {
            const { gigId, rating, comment } = req.body
            //get gigId, rating, comment from request body

            //check if gig exists 
            const gig = await Gig.findById(gigId)
            if(!gig) {
                  return res.status(404).json({
                        message: "Gig not found"
                  })
            }

            //check if client has a completed order for this gig 
            //onlt clients who completed an order can review

            const order = await Order.findOne({
                  gig: gigId,
                  client: req.user.userId, 
                  status: "completed"
                  // fid order where gig matches, client matches and status is completed
            })

            if (!order) {
                  return res.status(400).json({
                        message: "You can only review after completing an order"
                  })
            }

            //check if client already reviewed this gig
            const existingReview = await Review.findOne({
                  gig: gigId, 
                  client: req.user.userId
                  //find if this clent already reviewed this gig
            })

            if (existingReview) {
                  return res.status(400).json({
                        message: "You already reviewed this gig"
                  })
            }
            // create the review 
            const review = await Review.create({
                  gig: gigId,
                  client: req.user.userId,
                  rating,
                  comment
            })

            const allReviews = await Review.find({ gig:  gigId })
            // calculate average rating
            const avgRating = allReviews.reduce((sum, r) => sum + rating, 0) / allReviews.length

            await Gig.findByIdAndUpdate(gigId, {
                  rating: avgRating.toFixed(1),
                  // tofixed(1) means one decimal place like 4.5
                  totalReviews: allReviews.length
            })
            res.status(201).json({
                  message: "Review added successfully ✅",
                  review
            })
      } catch (error) {
            res.status(500).json({
                  message: "Server error",
                  error: error.message
            })
      }
}

// get all reviews for a gig

export const getGidReviews = async (req, res) => {
      try {
            const reviews = await Review.find({ gig: req.params.gigId})
            .populate("client", "name profilepicture")
            //populate client name and picture to show in review

            res.status(200).json({
                  reviews
            })
      } catch (error) {
            res.status(500).json({
                  message: "Server error",
                  error: error.message
            })
      }
}