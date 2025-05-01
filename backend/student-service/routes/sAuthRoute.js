import express from 'express';
import { verifyStudentToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Verify authentication status
router.get('/verify', verifyStudentToken, (req, res) => {
  res.status(200).json({
    success: true,
    student: req.student
  });
});

export default router; 