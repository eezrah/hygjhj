import app from "./app.js";
import { pool } from "../config/db.js";
import dotenv from "dotenv";



// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 6002;
const SERVICE_NAME = process.env.SERVICE_NAME || 'registrar';

// Database initialization
async function initDB() {
    try {
        const res = await pool.query("SELECT NOW()");
        console.log(`[${SERVICE_NAME}] Connected to PostgreSQL:`, res.rows[0].now);
        return true;
    } catch (error) {
        console.error(`[${SERVICE_NAME}] Database connection error:`, error);
        return false;
    }
}

// Start server with database initialization
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`${SERVICE_NAME} Running on port ${PORT}`);
    });
});
  
