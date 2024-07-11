import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getPosts = async (req, res, next) => {
  try {
    const userFollowing = await User.findById(req.user.id).select("following");
    const posts = await Post.find({
      $or: [{ userId: req.user.id }, { userId: { $in: userFollowing } }],
    }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getSuggestedUsers = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const following = user.following;
    const users = await User.find({
      _id: { $nin: following, $ne: req.user.id },
    })
      .select(" name _id profilePicture followers following ")
      .sort({ followers: -1 });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
