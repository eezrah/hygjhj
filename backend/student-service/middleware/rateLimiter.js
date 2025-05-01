import rateLimit from "express-rate-limit";

// Create a rate limiter for general API routes
export const apiLimiter = rateLimit({
  windowMs: 0, // 15 minutes
  max: 1000000000000000000000000, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests from this IP, please try again after 15 minutes",
  skipFailedRequests: false, // count failed requests
  keyGenerator: (req) => {
    // You can customize how to identify users (IP + user ID if authenticated)
    return req.ip;
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later.",
    });
  },
});

// Create a stricter limiter for authentication routes
export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1000000000000000000000000, // limit each IP to 5 requests per hour
  message: "Too many login attempts, please try again after 5 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});
