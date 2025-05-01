import express from "express";
import { verifyStudentToken } from "../middleware/authMiddleware.js";
import {
  PostPersonalData,
  PostStudentInfo,
  PostCurricularActivities,
  PostCommunityInvolvement,
  PostStudentYearLevel,
  PostAward,
  PostParents,
  PostSiblingsStudying,
  PostSiblingsNotStudying,
} from "../controllers/sApplicationFormController.js";

// Initialize router
const router = express.Router();

// Protect routes with the middleware
router.use(verifyStudentToken);

// Application Form Routes
router.post("/personal-data", PostPersonalData);
router.post("/student-info", PostStudentInfo);
router.post("/student-yearlevel", PostStudentYearLevel);
router.post("/curricular-activities", PostCurricularActivities);
router.post("/awards", PostAward);
router.post("/community-involvement", PostCommunityInvolvement);
router.post("/parents", PostParents);
router.post("/siblings-studying", PostSiblingsStudying);
router.post("/siblings-not-studying", PostSiblingsNotStudying);

export default router;
