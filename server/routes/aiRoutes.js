import express from "express";

const router = express.Router();

router.post("/chat", verifyToken, chat);
// only logged in users can use AI chat

export default router;
