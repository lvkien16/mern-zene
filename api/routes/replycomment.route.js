import express from "express";
import { verifyToken } from "./../utils/verifyUser.js";
import {
  createReplyComment,
  getReplyComments,
} from "../controllers/replycomment.controller.js";

const router = express.Router();

router.post("/reply/:commentId", verifyToken, createReplyComment);
router.get("/get/:commentId", verifyToken, getReplyComments);

export default router;
