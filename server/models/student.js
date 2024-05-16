import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  studentname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const StudentModel = mongoose.model("Student", StudentSchema);

export { StudentModel as Student };
