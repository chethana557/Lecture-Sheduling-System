import { Timetable } from "../models/timetable.js";

export const addTimetable = async (req, res) => {
  const { coursename, courseId, date, time, lecturerName } = req.body;
  // const  course = await Course.findOne({ coursename});
  // if ( course) {
  //   return res.json({ message: " Course already exists" });
  // }

  // const hashPassword = await bcrypt.hash("default123", 10);
  const newTimetable = new Timetable({
    coursename,
    courseId,
    date,
    time,
    lecturerName
  });

  await newTimetable.save();
  return res.json({ status: true, message: "Timetable Added" });
};

export const getAllTimetables = async (req, res) => {
  try {
    const timetable = await Timetable.find({}); // Exclude password field
    return res.json(timetable);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOneTimetbale = async (req, res) => {
  try {
    const { id } = req.params;

    const timetable = await Timetable.findById(id);
    if (!timetable) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude password field from the returned user object
    // const { password, ...courseData } = course.toObject();

    return res.json(timetable);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const { coursename,
      courseId,
      date,
      time,
      lecturerName } = req.body;

    const timetable = await Timetable.findById(id);
    if (!timetable) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided
    if (coursename) timetable.coursename = coursename;
    if (courseId) timetable.courseId = courseId;
    if (date) timetable.date = date;
    if (time) timetable.time = time;
    if (lecturerName) timetable.lecturerName = lecturerName;
    // if (email) course.email = email;
    // if (password) {
    //   const hashPassword = await bcrypt.hash(password, 10);
    //  course.password = hashPassword;
    // }

    await timetable.save();
    return res.json({ status: true, message: "Timetable updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    const timetable = await Timetable.findByIdAndDelete(id);
    if (!timetable) {
      return res.status(404).json({ message: "timetable not found" });
    } else {
      return res.json({ status: true, message: "timetable deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
