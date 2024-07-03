import express from "express";
import { verifyToken } from "./../utils/verifyUser.js";
import {
  deleteConversation,
  getConversations,
  getLastMessage,
  getMessages,
  getUnreadMessages,
  readMessages,
  sendMessage,
  unsendMessage,
  unsendMessageForEveryone,
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
router.put("/unsendforone/:messageId", verifyToken, unsendMessage);
router.delete(
  "/unsendforeveryone/:messageId",
  verifyToken,
  unsendMessageForEveryone
);
router.put("/deleteconversation/:userId", verifyToken, deleteConversation);

export default router;
