import Gig from "../model/Gig.js";

export const createGig = async (req, res) => {
  try {
    const { title, description, category, price, deliveryDays } = req.body;

    if (!title || !description || !category || !price || !deliveryDays) {
      return req.status(400).json({
        message: "All fields are required",
      });
    }

    const gig = await Gig.create({
      freelancer: req.user.userId,
      title,
      description,
      category,
      price,
      deliveryDays,
    });

    res.status(201).json({
      message: "Gig created successfully ✅",
      gig,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllGigs = async (req, res) => {
  try {
    const { search, category } = req.query;

    //build filter object
    let filter = { isActive: true };

    if (search) {
      filter.title = { $regex: search, $options: "i" };
      //regex means search inside text
      //options: "i" means case insensitive
    }
    if (category) {
      filter.category = category;
    }

    //find gigs and populate freelancer name

    const gigs = await Gig.find(filter).populate(
      "freelacer",
      "name email profilepicture",
    );
    // populate means -> instead of just showing freelancer id , show their actual name etc..

    res.status(200).json({ gigs });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getSingleGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate(
      "freelancer",
      "name email profilePicture bio",
    );

    if (!gig) {
      return res.status(404).json({
            message: "Gig not found"
      })
    }
    res.status(200).json({ gig })
  } catch (error) {
      res.status(500).json({
            error: error.message
      })
  }
}

// update gig - only gig owner

export const updateGig = async (req, res) => {
      try {
            const gig = await Gig.findById(req.params.id)

            if (!gig) {
                  return res.status(404).json({
                        message: "Gig not found"
                  })
            }

            // check if looged in user is the owner
            if (gig.freelancer.toString() !== req.user.userId) {
                  return res.status(403).json({
                        message: "Not authorized to update this gig"
                  })
            }

            // update gig 

            const updatedGig = await Gig .findByIdAndUpdate(
                  req.params.id,
                  req.body,
                  { new: true }  // return updated gig not old one
            )
            res.status(200).json({
                  message: "Gig updated successfully ✅",
                  gig: updatedGig
            })
      } catch (error) {
            res.status(500).json({
                  message: " Server error",
                  error: error.message
            })
      }
}
 // delete gig - only gig owner

 export const deleteGig = async (req, res) => {
      try {
            const gig = await Gig.findById(req.params.id)

            if(!gig) {
                  return res.status(404).json({
                        message: "Gig not found"
                  })
            }

            if (gig.freelancer.toString() !== req.user.userId) {
                  return res.status(403).json({
                        message: "Not authorized to delete this gig"
                  })
            }

            await Gig.findByIdAndDelete(req.params.id)

            res.status(200).json({
                  message: "Gig deleted successfully ✅"
            })
      } catch (error) {
            res.status(500).json({
                  message: "Server error" ,
                  error: error.message
            })
      }
 }