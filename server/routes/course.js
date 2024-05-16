import express from "express";
import {
  addCourse,
  getAllCourses,
  getOneCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.js";

const router = express.Router();

router.post("/addcourse", addCourse);
router.get("/", getAllCourses);
router.get("/:id", getOneCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export { router as CourseRouter };
