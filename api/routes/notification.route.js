import express from "express";
import { verifyToken } from "./../utils/verifyUser.js";
import {
  createNotification,
  getNotifications,
  readNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/createnotification", verifyToken, createNotification);
router.get("/getnotifications", verifyToken, getNotifications);
router.put("/readnotification/:id", verifyToken, readNotification);

export default router;
