import express from "express";
import { validateStudent } from "../controllers/rRegistrarValidation.js";

const router = express.Router();

// Route to validate student eligibility
router.post('/validate', validateStudent);

export default router;