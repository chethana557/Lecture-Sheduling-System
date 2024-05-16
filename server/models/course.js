import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  coursename: { type: String, required: true },
  courseId: { type: String, required: true },
});

const CourseModel = mongoose.model("Course", CourseSchema);

export { CourseModel as Course };
