import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Student } from "../models/student.js";

export const studentryReg = async (req, res) => {
  const { studentname, email, password } = req.body;
  const student = await Student.findOne({ email });
  if (student) {
    return res.json({ message: "User already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newStudent = new Student({
    studentname,
    email,
    password: hashPassword,
  });

  await newStudent.save();
  return res.json({ status: true, message: "Record registered" });
};

export const addStudent = async (req, res) => {
  const { studentname, email } = req.body;
  const student = await Student.findOne({ email });
  if (student) {
    return res.json({ message: "User already exists" });
  }

  const hashPassword = await bcrypt.hash("default123", 10);
  const newStudent = new Student({
    studentname,
    email,
    password: hashPassword,
  });

  await newStudent.save();
  return res.json({ status: true, message: "Record registered" });
};

export const entryReg = async (req, res) => {
  const { username, password } = req.body;
  const student = await Student.findOne({ username });
  if (!student) {
    return res.json({ message: "studnet is not registered" });
  }

  const validPassword = await bcrypt.compare(password, student.password);
  if (!validPassword) {
    return res.json({
      message: "Password is incorrect",
    });
  }

  const token = jwt.sign({ username: student.username }, process.env.KEY, {
    expiresIn: "1hr",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "Login successfully" });
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}, { password: 0 }); // Exclude password field
    return res.json(students);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOneStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude password field from the returned user object
    const { password, ...studentData } = student.toObject();

    return res.json(studentData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentname, email, password } = req.body;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided
    if (studentname) student.studentname = studentname;
    if (email) student.email = email;
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      student.password = hashPassword;
    }

    await student.save();
    return res.json({ status: true, message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.json({ status: true, message: "User deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
