import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import conversationRoutes from "./routes/conversation.route.js";
import messageRoutes from "./routes/message.route.js";
import replycommentRoutes from "./routes/replycomment.route.js";
import notificationRoutes from "./routes/notification.route.js";
import homeRoutes from "./routes/home.route.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { onConnection } from "./socket/socket.js";
import path from "path";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!!");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB!!", err);
  });

const __dirname = path.resolve();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.set("socketio", io);
io.on("connection", onConnection);

server.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/replycomment", replycommentRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/home", homeRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
