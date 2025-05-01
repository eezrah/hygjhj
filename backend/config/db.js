import dotenv from "dotenv";
import pkg from "pg";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "../../");

// Load .env from root directory
dotenv.config({ path: join(rootDir, ".env") });

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

// Error handling
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export { pool };
