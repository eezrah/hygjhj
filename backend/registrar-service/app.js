import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import registrarValidationRoute from "./routes/rRegistrarValidationRoute.js";

// Import routes


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev")); // This will help us see the requests in the console
app.use(express.json());

// Routes
app.use('/api/registrar', registrarValidationRoute);




app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});


export default app; 