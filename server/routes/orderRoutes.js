import express from "express"


import { verifyToken } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"
import { getClientOders, getFreelancerOrders, placeOrder, updateOrderStatus } from "../controllers/orderController.js"


const router = express.Router()

router.post("/", verifyToken, authorizeRoles("client"), placeOrder)

//cleint sees their orders
router.get("/client", verifyToken, authorizeRoles("client"), getClientOders)

//freelancer sees their order

router.get("/freelancer", verifyToken, authorizeRoles("freelancer"), getFreelancerOrders)

//update order status

router.put("/:id", verifyToken, updateOrderStatus)

export default router