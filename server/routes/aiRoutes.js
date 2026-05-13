import express from "express";
import { chat } from "../controllers/aiController.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/chat", verifyToken, chat);
// only logged in users can use AI chat

export default router;
