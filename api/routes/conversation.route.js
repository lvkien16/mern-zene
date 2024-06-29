import express from "express";
import { verifyToken } from "./../utils/verifyUser.js";
import {
  createConversation,
  getConversation,
  getConversations,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/create/:id", verifyToken, createConversation);
router.get("/getconversation/:userId", verifyToken, getConversation);
router.get("/getconversations/:userId", verifyToken, getConversations);

export default router;
