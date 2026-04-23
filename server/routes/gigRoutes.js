import express from "express"
import { createGig, deleteGig, getAllGigs, getSingleGig, updateGig } from "../controllers/gigController.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const router = express.Router()

//public - anyone can veiw gigs

router.get("/", getAllGigs)
router.get("/:id", getSingleGig)

// private only freelancer

router.post("/", verifyToken, authorizeRoles("freelancer"), createGig)
router.put("/:id", verifyToken, authorizeRoles("freelancer"), updateGig)
router.delete("/:id", verifyToken, authorizeRoles("freelancer"), deleteGig)

export default router