import express from "express";
import { verifyToken } from "./../utils/verifyUser.js";
import {
  getConversations,
  getLastMessage,
  getMessages,
  getUnreadMessages,
  readMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send/:receiver", verifyToken, sendMessage);
router.get("/get/:userId", verifyToken, getMessages);
router.get("/get/conversations/:userId", verifyToken, getConversations);
router.get(
  "/getlastmessage/:senderId/:receiverId",
  verifyToken,
  getLastMessage
);
router.get("/get/unreadmessages/:senderId", verifyToken, getUnreadMessages);
router.put("/read/:senderId", verifyToken, readMessages);

export default router;
