import express from "express";
import Message from "../models/message.model.js";
import { verifyToken } from "./../utils/verifyUser.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send/:conversationId", sendMessage);
router.get("/get/:conversationId", verifyToken, getMessages);

export default router;
