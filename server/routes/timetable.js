import express from "express";
import {
  addTimetable,
  getAllTimetables,
  getOneTimetbale,
  updateTimetable,
  deleteTimetable,
} from "../controllers/timetable.js";

const router = express.Router();

router.post("/addTimetable", addTimetable);
router.get("/", getAllTimetables);
router.get("/:id", getOneTimetbale);
router.put("/:id", updateTimetable);
router.delete("/:id", deleteTimetable);

export { router as TimetableRouter };
