import { errorHandler } from "./../utils/error.js";
import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res, next) => {
  const members = req.body.members;
  const { id } = req.params;
  const newConversation = new Conversation({
    members: [...members, req.user.id],
  });
  try {
    const conversation = await Conversation.findOne({
      members: [id, req.user.id],
      isGroup: false,
    });
    if (conversation) {
      return res.status(200).json(conversation);
    } else {
      const savedConversation = await newConversation.save();
      res.status(201).json(savedConversation);
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

export const getConversation = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const conversation = await Conversation.findOne({
      $or: [
        { members: [userId, req.user.id] },
        { members: [req.user.id, userId] },
      ],
      isGroup: false,
    });
    res.status(200).json(conversation);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: req.user.id,
      isGroup: false,
    });
    res.status(200).json(conversations);
  } catch (error) {
    errorHandler(res, error);
  }
};
