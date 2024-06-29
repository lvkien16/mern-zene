import Message from "../models/message.model.js";
import { errorHandler } from "./../utils/error.js";

export const sendMessage = async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.params.conversationId,
    senderId: req.body.senderId,
    content: req.body.content,
  });
  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
