import { verifyToken, generateStudentToken, cookieOptions } from "../../utils/jwtGenerator.js";

export const verifyStudentToken = (req, res, next) => {
  // Get tokens from cookies
  const { accessToken, refreshToken } = req.cookies;

  // Check if any token exists
  if (!accessToken && !refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }

  // Try to verify access token first
  if (accessToken) {
    const { valid, decoded, expired } = verifyToken(accessToken);
    
    if (valid) {
      req.student = decoded;
      return next();
    }
    
    // If access token expired, try refresh token
    if (expired && refreshToken) {
      const { valid: refreshValid, decoded: refreshDecoded } = verifyToken(refreshToken, true);
      
      if (refreshValid) {
        // Generate new access token
        const newAccessToken = generateStudentToken(refreshDecoded);
        res.cookie('accessToken', newAccessToken, cookieOptions);
        
        req.student = refreshDecoded;
        return next();
      }
    }
  }

  // Authentication failed
  return res.status(403).json({
    success: false,
    message: "Please login again"
  });
}; 