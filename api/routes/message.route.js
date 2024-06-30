import express from "express";
import { verifyToken } from "./../utils/verifyUser.js";
import {
  getConversations,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send/:receiver", verifyToken, sendMessage);
router.get("/get/:userId", verifyToken, getMessages);
router.get("/get/conversations/:userId", verifyToken, getConversations);

export default router;
