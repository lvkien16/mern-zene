import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  const userexist = await User.findOne({ email });

  if (userexist) {
    return res.status(400).json({ error: "User already exist" });
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const user = new User({ name, email, password: hashPassword });
  try {
    await user.save();
    res.status(201).json({ message: "User siged nup successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Failed to sign up" });
  }
};
