import express from "express";
import {
  multipleChoice,
  createMultipleChoiceQuestion,
  codingQuestions,
  createCodingQuestion,
  createCodingTestCase,
  essayQuestions,
  createEssayQuestion,
  technicalAssessment,
  createTechnicalAssessment,
  getAllTechnicalAssessments
} from "../controllers/sTechnicalAssessment.js";


const router = express.Router();

// Get all technical assessments
router.get("/technical-assessments", getAllTechnicalAssessments);

// Create a new technical assessment
router.post("/technical-assessment", createTechnicalAssessment);

// Get a specific technical assessment
router.get("/technical-assessment/:assessmentId", technicalAssessment);

// Multiple choice questions endpoints
router.get("/technical-assessment/:technicalAssessmentId/multiple-choice", multipleChoice);
router.post("/technical-assessment/multiple-choice", createMultipleChoiceQuestion);

// Coding questions endpoints
router.get("/technical-assessment/:technicalAssessmentId/coding", codingQuestions);
router.post("/technical-assessment/coding", createCodingQuestion);
router.post("/technical-assessment/coding/test-case", createCodingTestCase);

// Essay questions endpoints
router.get("/technical-assessment/:technicalAssessmentId/essay", essayQuestions);
router.post("/technical-assessment/essay", createEssayQuestion);

export default router; 