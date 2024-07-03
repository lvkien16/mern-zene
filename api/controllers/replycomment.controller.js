import ReplyComment from "../models/replycomment.model.js";

export const createReplyComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;
    const commentId = req.params.commentId;

    const replyComment = new ReplyComment({ userId, commentId, content });

    await replyComment.save();

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
