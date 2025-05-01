import { pool } from "../../config/db.js";
import {
  sanitizePassword,
  validatePasswordStrength,
  hashPassword,
} from "../../utils/passwordUtils.js";
import { 
  generateStudentToken, 
  generateStudentRefreshToken,
  cookieOptions 
} from "../../utils/jwtGenerator.js";
import {
  validateStudentId,
  validateSchoolEmail,
} from "../../utils/validationUtils.js";

export const registerStudent = async (req, res) => {
  try {
    const {
      student_id, // integer
      student_password, // character varying
      role_id, // integer (default 1 for students)
      s_firstname, // character varying
      s_lastname, // character varying
      year_level, // character varying
      s_campus, // character varying
      s_course_program, // character varying
      s_school_email, // character varying
      s_secondary_email, // character varying
      s_contact_number, // character varying
      s_graduation_batch, // character varying
      s_middlename, // character varying
      s_suffix, // character varying
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "student_id",
      "student_password",
      "s_firstname",
      "s_lastname",
      "year_level",
      "s_campus",
      "s_course_program",
      "s_school_email",
      "s_contact_number",
      "s_graduation_batch",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        fields: missingFields,
      });
    }

    // Validate student_id is a number
    if (!validateStudentId(student_id)) {
      return res.status(400).json({
        error: "Invalid student ID format",
        message:
          "Student ID must be an 11-digit number starting with '02000' (e.g., 02000234567)",
      });
    }

    // Validate email format
    if (!validateSchoolEmail(s_school_email)) {
      return res.status(400).json({
        error: "Invalid email format",
        message:
          "Please provide a valid STI email address (must end with .sti.edu.ph, e.g., @ortigas-cainta.sti.edu.ph)",
      });
    }

    // Validate password strength
    const sanitizedPassword = sanitizePassword(student_password);
    const passwordValidation = validatePasswordStrength(sanitizedPassword);

    if (!passwordValidation.isValid) {
      return res.status(400).json({
        error: "Password requirements not met",
        details: passwordValidation.errors,
      });
    }

    // check if student already exists
    const checkResult = await pool.query(
      "SELECT * FROM check_student_account($1, $2);",
      [student_id, s_school_email]
    );

    if (checkResult.rows[0]?.check_student_account) {
      return res.status(400).json({
        error: "Account already exists",
        message: "Student with this ID or email already exists",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(sanitizedPassword);

    // Call the stored procedure
    await pool.query(
      `CALL public.sp_insert_student_account($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        student_id,
        hashedPassword,
        role_id || 1, // default role_id for students
        s_firstname,
        s_lastname,
        year_level,
        s_campus,
        s_course_program,
        s_school_email,
        s_secondary_email || "",
        s_contact_number,
        s_graduation_batch,
        s_middlename || "",
        s_suffix || "",
      ]
    );

    // Generate JWT tokens with standardized field names (matching login)
    const studentData = {
      studentid: Number(student_id),
      s_schoolemail: s_school_email,
      roleid: Number(role_id || 1)
    };

    // Generate tokens
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
    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student: {
        studentid: Number(student_id),
        s_schoolemail: s_school_email,
        roleid: Number(role_id || 1),
        s_firstname,
        s_lastname,
        year_level,
        s_course_program,
      }
    });
  } catch (error) {
    console.error("Error in registerStudent:", error);

    // Handle specific database errors
    if (error.code === "23505") {
      // Unique violation
      return res.status(409).json({
        error: "Duplicate entry",
        message: "Student with this ID or email already exists",
      });
    }

    // Handle pending registration case
    if (
      error.message &&
      error.message.includes(
        "already in the Pending_Registration_Students_List"
      )
    ) {
      return res.status(409).json({
        error: "Duplicate entry",
        message:
          "A registration with this Student ID is already pending approval.",
      });
    }

    res.status(500).json({
      error: "Registration failed",
      message: "An error occurred while registering the student",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
