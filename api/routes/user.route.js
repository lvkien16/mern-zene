import express from "express";
import { getUser, signout, test } from "../controllers/user.controller.js";
import { verifyToken } from "./../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.get("/getuser/:id", getUser);
router.post("/signout", signout);

export default router;
