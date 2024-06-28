import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

export const createComment = async (req, res, next) => {
  const { postId } = req.params;
  const { content, userId } = req.body;
  if (!content) {
    return res.status(400).json({
      success: false,
      message: "Content is required",
    });
  }
  try {
    const newComment = new Comment({
      userId,
      postId,
      content,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId }).populate(
      "userId",
      "name _id profilePicture"
    );
    if (!comments) {
      return res.status(404).json({
        success: false,
        message: "No comments yet",
      });
    }
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    const isLiked = comment.likes.includes(req.user.id);
    if (isLiked) {
      comment.likes.splice(comment.likes.indexOf(req.user.id), 1);
    } else {
      comment.likes.push(req.user.id);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
