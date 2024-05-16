import express from "express";
import {
  addStudent,
  entryReg,
  getAllStudents,
  getOneStudent,
  updateStudent,
  deleteStudent,
  studentryReg,
} from "../controllers/student.js";

const router = express.Router();

router.post("/studentryreg", studentryReg);
router.post("/addstudent", addStudent);
router.post("/studentry", entryReg);
router.get("/", getAllStudents);
router.get("/:id", getOneStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export { router as StudentRouter };
