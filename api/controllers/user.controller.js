import User from "./../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json("API is working");
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...rest } = user._doc;
    res.json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("Signout success");
  } catch (error) {
    next(error);
  }
};

export const followUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    const isFollowed = user.followers.includes(req.user.id);

    if (isFollowed) {
      user.followers.splice(user.followers.indexOf(req.user.id), 1);
      currentUser.following.splice(
        currentUser.following.indexOf(req.params.id),
        1
      );
    } else {
      user.followers.push(req.user.id);
      currentUser.following.push(req.params.id);
    }

    await user.save();
    await currentUser.save();

    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
