import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Secrets
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "default_refresh_secret";

// Token Generation
export const generateStudentToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

export const generateStudentRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
};

// Token Verification
export const verifyToken = (token, isRefresh = false) => {
  try {
    const secret = isRefresh ? REFRESH_SECRET : JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    return { valid: true, decoded };
  } catch (error) {
    return { 
      valid: false, 
      error: error.message,
      expired: error.name === "TokenExpiredError"
    };
  }
};

// Cookie Configuration
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
