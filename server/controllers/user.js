import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const entryReg = async (req, res) => {
  const { username, email, password, role } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
    role: role,
  });

  await newUser.save();
  return res.json({ status: true, message: "Record registered" });
};

export const addUser = async (req, res) => {
  const { username, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User already exists" });
  }

  const hashPassword = await bcrypt.hash("default123", 10);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  await newUser.save();
  return res.json({ status: true, message: "Record registered" });
};

export const entry = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.json({ message: "User is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({
      message: "Password is incorrect",
    });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1hr",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ lecStatus: true, message: "Login successfully" });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password field
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude password field from the returned user object
    const { password, ...userData } = user.toObject();

    return res.json(userData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
    }

    await user.save();
    return res.json({ status: true, message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.json({ status: true, message: "User deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
