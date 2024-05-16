import mongoose from "mongoose";
const TimetableSchema = new mongoose.Schema({
  coursename: { type: String, required: true },
  courseId: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true }, // Add time field
  lecturerName: { type: String, required: true }, // Add lecturer's name field
});


const TimetableModel = mongoose.model("Timetable", TimetableSchema);

export { TimetableModel as Timetable };
