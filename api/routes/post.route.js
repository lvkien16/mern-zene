import express from "express";
import { verifyToken } from "./../utils/verifyUser.js";
import {
  createPost,
  getPost,
  getPosts,
  likePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/getpost/:id", verifyToken, getPost);
router.get("/getposts/:userId", verifyToken, getPosts);
router.put("/like/:id", verifyToken, likePost);

export default router;
