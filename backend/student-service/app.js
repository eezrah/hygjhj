import { apiLimiter, authLimiter } from "./middleware/rateLimiter.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Import routes
import sRegisterRoute from "./routes/sRegisterRoute.js";
import sLoginRoute from "./routes/sLoginRoute.js";
import sApplicationFormRoute from "./routes/sApplicationFormRoute.js";
import sAuthRoute from "./routes/sAuthRoute.js";
import sTechnicalAssessmentRoute from "./routes/sTechnicalAssessmentRoute.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  credentials: true, // Enable cookies
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Your frontend URL
}));
app.use(helmet());
app.use(morgan("dev")); // This will help us see the requests in the console
app.use(cookieParser()); // Add cookie parsing middleware
app.use(express.json({ limit: "10kb" })); // Limit JSON payload size
app.use(apiLimiter); // General API rate limiting

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes with specific rate limiting
app.use("/api/student", authLimiter, sRegisterRoute);
app.use("/api/student", authLimiter, sLoginRoute);
app.use("/api/student", sApplicationFormRoute);
app.use("/api/student", sAuthRoute);
app.use("/api/student", sTechnicalAssessmentRoute);

app.use((err, req, res, next) => {
  console.error("Error:", err);

  // Handle specific error types
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }

  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

export default app;
