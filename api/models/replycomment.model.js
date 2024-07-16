import mongoose from "mongoose";

const replyCommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    commentId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const ReplyComment = mongoose.model("ReplyComment", replyCommentSchema);

export default ReplyComment;
