import express from "express";
import {
  
  addUser,
  entry,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  entryReg,
} from "../controllers/user.js";

const router = express.Router();

router.post("/entryreg", entryReg);
router.post("/adduser", addUser);
router.post("/entry", entry);
router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export { router as UserRouter };
