import express from 'express';
import { registerStudent } from '../controllers/sRegisterController.js';

const router = express.Router();

// Registration endpoint
router.post('/register', registerStudent);

export default router;