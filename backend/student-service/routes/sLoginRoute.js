import express from 'express';
import { loginStudent, logoutStudent } from '../controllers/sLoginController.js';
import { clearAuthCookies } from '../middleware/cookieMiddleware.js';

const router = express.Router();

// Login endpoint - cookies are now set directly in the controller
router.post('/login', loginStudent);

// Logout endpoint - clear cookies before sending response
router.post('/logout', clearAuthCookies, logoutStudent);

export default router; 