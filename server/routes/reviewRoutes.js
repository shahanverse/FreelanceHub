import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import { addReview, getGidReviews } from "../controllers/reviewController";

const router = express.Router()

//only client can add review
router.post("/", verifyToken, authorizeRoles("client"), addReview)

//anyone can see reviews
router.get("/:gigId", getGidReviews)

export default router