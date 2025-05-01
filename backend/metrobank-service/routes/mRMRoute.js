import express from "express";
import {
  getAllStudents,
  putApprovedApplication,
  putDeniedApplication,
  getStudentById,
  getAttachment,
} from "../controllers/mRMController.js";

const router = express.Router();

// Route to get all available students
router.get("/students", getAllStudents);

// Route to get a single student by ID
router.get("/students/:studentId", getStudentById);

// Get attachment (to be implemented)
router.get("/attachment/:id", getAttachment);

// Update student status to approved
router.put("/students/approved/:studentid", putApprovedApplication);

// Update student status to denied
router.put("/students/denied/:studentid", putDeniedApplication);

export default router;