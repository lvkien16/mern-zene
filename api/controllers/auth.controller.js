import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  const userexist = await User.findOne({ email });

  if (userexist) {
    return next(errorHandler(400, "User already exist"));
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const user = new User({ name, email, password: hashPassword });
  try {
    await user.save();
    res.status(201).json({ message: "User siged nup successfully" });
  } catch (error) {
    next(error);
  }
};
