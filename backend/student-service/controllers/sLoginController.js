import { pool } from "../../config/db.js";
import { comparePassword } from "../../utils/passwordUtils.js";
import { 
  generateStudentToken, 
  generateStudentRefreshToken,
  cookieOptions
} from "../../utils/jwtGenerator.js";
import {
  validateSchoolEmail,
  validatePersonalEmail,
} from "../../utils/validationUtils.js";

export const loginStudent = async (req, res, next) => {
  try {
    const { s_schoolemail, studentpassword } = req.body;
    console.log("Login attempt for:", s_schoolemail);

    // Validate required fields
    if (!s_schoolemail || !studentpassword) {
      console.log("Missing fields:", {
        s_schoolemail: !!s_schoolemail,
        studentpassword: !!studentpassword,
      });
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        message: "School email and password are required",
      });
    }

    // Validate email format (must be STI school email)
    if (!validateSchoolEmail(s_schoolemail)) {
      console.log("Invalid email format:", s_schoolemail);
      return res.status(400).json({
        success: false,
        error: "Invalid email format",
        message: "Please provide a valid STI school email",
      });
    }

    // Call the PostgreSQL function to get student credentials
    console.log("Querying database for student credentials...");
    const result = await pool.query(
      "SELECT * FROM login_student_returncredentials($1)",
      [s_schoolemail]
    );
    console.log("Database response:", result.rows);

    if (!result.rows || result.rows.length === 0) {
      console.log("No student found with email:", s_schoolemail);
      return res.status(401).json({
        success: false,
        error: "Authentication failed",
        message: "Invalid email or password",
      });
    }

    const student = result.rows[0];
    console.log("Found student:", {
      studentid: student.studentid,
      s_schoolemail: student.s_schoolemail,
      roleid: student.roleid,
      hasPassword: !!student.studentpassword,
    });

    // Verify password
    console.log("Comparing passwords...");
    const isValidPassword = await comparePassword(
      studentpassword,
      student.studentpassword
    );
    console.log("Password validation result:", isValidPassword);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: "Authentication failed",
        message: "Invalid email or password",
      });
    }

    // Check if student has a valid role
    if (!student.roleid) {
      return res.status(403).json({
        success: false,
        error: "Authorization failed",
        message: "No role assigned to this account",
      });
    }

    // Generate JWT tokens with student data
    const studentData = {
      studentid: student.studentid,
      s_schoolemail: student.s_schoolemail,
      roleid: student.roleid,
    };

    console.log("Generating tokens for student:", studentData);
    const accessToken = generateStudentToken(studentData);
    const refreshToken = generateStudentRefreshToken(studentData);

    // Set the tokens as cookies
    res.cookie('accessToken', accessToken, cookieOptions);
    res.cookie('refreshToken', refreshToken, {
      ...cookieOptions,
      // Refresh token typically has a longer lifespan
      maxAge: cookieOptions.maxAge
    });

    // Return success response
    const response = {
      success: true,
      message: "Login successful",
      student: {
        studentid: student.studentid,
        s_schoolemail: student.s_schoolemail,
        roleid: student.roleid,
      }
    };
    console.log("Sending success response:", response);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in loginStudent:", error);
    return res.status(500).json({
      success: false,
      error: "Login failed",
      message: "An error occurred while logging in",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Logout controller - clear cookies
export const logoutStudent = (req, res) => {
  // Clear the authentication cookies
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  
  return res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};
