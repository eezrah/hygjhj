import { cookieOptions } from "../../utils/jwtGenerator.js";

// Set authentication cookies
export const setAuthCookies = (req, res, next) => {
  const { accessToken, refreshToken } = req.tokens;
  
  if (!accessToken || !refreshToken) {
    return res.status(500).json({
      success: false,
      message: "Failed to set authentication cookies"
    });
  }

  res.cookie('accessToken', accessToken, cookieOptions);
  res.cookie('refreshToken', refreshToken, cookieOptions);
  next();
};

// Clear authentication cookies
export const clearAuthCookies = (req, res, next) => {
  res.clearCookie('accessToken', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);
  next();
}; 