import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import { deleteUser, getAllOrders, getAllUsers, getDashBoardStats } from "../controllers/adminController.js";
import { getAllGigs } from "../controllers/gigController.js"

const router = express.Router()

// all admin routes need verifyToken and admin role 
// verifyToken checks if logged in
//authorizeRoles("admin") checks if admin

router.get("/users", verifyToken, authorizeRoles("admin"), getAllUsers)
// get all users 

router.delete("/users/:id", verifyToken, authorizeRoles("admin"), deleteUser
)

router.get("/orders", verifyToken, authorizeRoles("admin"), getAllOrders)
// get all orders

router.get("/gigs", verifyToken, authorizeRoles("admin"), getAllGigs)
// gel all gigs

router.delete('/gig/:id', verifyToken, authorizeRoles("admin"), getDashBoardStats)
//get dashboard stats

export default router