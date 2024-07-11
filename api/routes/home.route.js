import express from "express";
import { verifyToken } from "./../utils/verifyUser.js";
import { getPosts, getSuggestedUsers } from "../controllers/home.controller.js";

const router = express.Router();

router.get("/getposts", verifyToken, getPosts);
router.get("/suggestusers", verifyToken, getSuggestedUsers);

export default router;
