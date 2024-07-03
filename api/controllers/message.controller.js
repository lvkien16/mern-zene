import Message from "../models/message.model.js";
import { errorHandler } from "./../utils/error.js";

export const sendMessage = async (req, res, next) => {
  const newMessage = new Message({
    sender: req.user.id,
    receiver: req.params.receiver,
    text: req.body.text,
    images: req.body.images,
    videos: req.body.videos,
  });
  try {
    const savedMessage = await newMessage.save();
    const io = req.app.get("socketio");
    io.emit("message", savedMessage);
    res.status(201).json(savedMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.id },
      ],
      hidden: { $nin: [req.user.id] },
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $gt: ["$sender", "$receiver"] },
              { sender: "$receiver", receiver: "$sender" },
              { sender: "$sender", receiver: "$receiver" },
            ],
          },
          lastMessage: { $last: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          sender: "$_id.sender",
          receiver: "$_id.receiver",
          lastMessage: 1,
        },
      },
      {
        $sort: { "lastMessage.createdAt": -1 },
      },
    ]);

    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};

export const getLastMessage = async (req, res, next) => {
  try {
    const lastMessage = await Message.findOne({
      $or: [
        { sender: req.params.senderId, receiver: req.params.receiverId },
        { sender: req.params.receiverId, receiver: req.params.senderId },
      ],
      hidden: { $nin: [req.user.id] },
    }).sort({ createdAt: -1 });
    res.status(200).json(lastMessage);
  } catch (error) {
    next(error);
  }
};

export const getUnreadMessages = async (req, res, next) => {
  const senderId = req.params.senderId;
  try {
    const unreadMessages = await Message.find({
      sender: senderId,
      receiver: req.user.id,
      read: false,
    });
    res.status(200).json(unreadMessages);
  } catch (error) {
    next(error);
  }
};

export const readMessages = async (req, res, next) => {
  const senderId = req.params.senderId;
  try {
    const message = await Message.find({
      sender: senderId,
      receiver: req.user.id,
      read: false,
    });

    message.forEach(async (msg) => {
      if (msg.sender.toString() === senderId) {
        msg.read = true;
        await msg.save();
      }
    });

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const unsendMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.messageId);
    message.hidden.push(req.user.id);
    await message.save();
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const unsendMessageForEveryone = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    await Message.deleteOne({ _id: req.params.messageId });

    const io = req.app.get("socketio");
    io.emit("unsend", req.params.messageId);

    res.status(200).json({
      message: "Message deleted successfully",
      id: req.params.messageId,
    });
  } catch (error) {
    next(error);
  }
};
