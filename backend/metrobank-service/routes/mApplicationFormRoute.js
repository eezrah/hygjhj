import express from "express";
import {
    GetPersonalData,
    GetStudentInfo,
    GetCurricularActivities,
    GetCommuniityInvolvedment,
    GetFamilyReference
} from "../controllers/mApplicationFormController.js";

const router = express.Router();

router.get("/personal-data/:studentid", GetPersonalData);
router.get("/student-info/:studentid", GetStudentInfo);
router.get("/curricular-activities/:studentid", GetCurricularActivities);
router.get("/community-involvement/:studentid", GetCommuniityInvolvedment);
router.get("/family-reference/:studentid", GetFamilyReference);

export default router;