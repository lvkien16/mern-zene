import Comment from "../models/comment.model.js";
import ReplyComment from "../models/replycomment.model.js";
import { createNotification } from "./notification.controller.js";

export const createReplyComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;
    const commentId = req.params.commentId;
    const postId = req.params.postId;

    const replyComment = new ReplyComment({
      userId,
      commentId,
      content,
      postId,
    });

    const comment = await Comment.findById({ _id: commentId });

    await replyComment.save();

    if (comment.userId.toString() !== req.user.id.toString()) {
      await createNotification({
        title: "replied to your comment",
        fromUser: req.user.id,
        toUser: comment.userId,
        link: `/post/${comment.postId}`,
      });
    }

    res.status(201).json(replyComment);
  } catch (error) {
    next(error);
  }
};

export const getReplyComments = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const replyComments = await ReplyComment.find({ commentId });

    res.status(200).json(replyComments);
  } catch (error) {
    next(error);
  }
};

export const getReplyCommentsByPostId = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const replyComments = await ReplyComment.find({ postId });

    res.status(200).json(replyComments);
  } catch (error) {
    next(error);
  }
};
