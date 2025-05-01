import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

// Import routes
import mApplicationFormRoute from "./routes/mApplicationFormRoute.js";
import mRMRoute from "./routes/mRMRoute.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev")); // This will help us see the requests in the console
app.use(express.json());

// Routes
app.use("/api/metrobank", mApplicationFormRoute);
app.use("/api/metrobank", mRMRoute);

// Health check endpoint to verify server is running
app.get('/health', (req, res) => {
    res.json({ status: 'UP' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler - Add this to catch unmatched routes
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.url} not found` });
});

export default app; 