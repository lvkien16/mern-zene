import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ access_token: token, ...rest });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, profilePicture } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "10h",
      });
      const { password: pass, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({ access_token: token, ...rest });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashPassword = await bcryptjs.hash(generatedPassword, 10);
      const newUser = new User({
        name,
        email,
        password: hashPassword,
        profilePicture,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "10h",
      });
      const { password: pass, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({ access_token: token, ...rest });
    }
  } catch (error) {
    next(error);
  }
};
