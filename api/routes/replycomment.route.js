import express from "express";
import { verifyToken } from "./../utils/verifyUser.js";
import {
  createReplyComment,
  getReplyComments,
  getReplyCommentsByPostId,
} from "../controllers/replycomment.controller.js";

const router = express.Router();

router.post("/reply/:commentId/:postId", verifyToken, createReplyComment);
router.get("/get/:commentId", verifyToken, getReplyComments);
router.get("/getbypostid/:postId", verifyToken, getReplyCommentsByPostId);

export default router;
