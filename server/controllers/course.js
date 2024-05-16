import { Course } from "../models/course.js";

export const addCourse = async (req, res) => {
  const { coursename, courseId } = req.body;
  // const  course = await Course.findOne({ coursename});
  // if ( course) {
  //   return res.json({ message: " Course already exists" });
  // }

  // const hashPassword = await bcrypt.hash("default123", 10);
  const newCourse = new Course({
    coursename,
    courseId,
  });

  await newCourse.save();
  return res.json({ status: true, message: "Record registered" });
};

export const getAllCourses = async (req, res) => {
  try {
    const course = await Course.find({}); // Exclude password field
    return res.json(course);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOneCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude password field from the returned user object
    // const { password, ...courseData } = course.toObject();

    return res.json(courseData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { coursename, courseId } = req.body;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided
    if (coursename) course.coursename = coursename;
    if (courseId) course.courseId = courseId;
    // if (email) course.email = email;
    // if (password) {
    //   const hashPassword = await bcrypt.hash(password, 10);
    //  course.password = hashPassword;
    // }

    await course.save();
    return res.json({ status: true, message: "course updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    } else {
      return res.json({ status: true, message: "course deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
