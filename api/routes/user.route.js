import express from "express";
import {
  followUser,
  getUser,
  signout,
  test,
} from "../controllers/user.controller.js";
import { verifyToken } from "./../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.get("/getuser/:id", getUser);
router.post("/signout", signout);
router.put("/follow/:id", verifyToken, followUser);

export default router;
