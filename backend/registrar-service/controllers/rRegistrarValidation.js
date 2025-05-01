import { pool } from "../../config/db.js";

export const validateStudent = async (req, res) => {
  try {
    const { studentId, password } = req.body;

    // Validate required fields
    if (!studentId || !password) {
      return res.status(400).json({
        success: false,
        message: "Student ID and password are required",
      });
    }

    // Check if student is in the eligible students list
    const { rows } = await pool.query(
      `SELECT studentid FROM eligible_students_list WHERE studentid = $1`,
      [studentId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student is not eligible to use the system",
      });
    }

    // If student is eligible, return success
    res.json({
      success: true,
      message: "Student is eligible to use the system",
      student: {
        studentId: rows[0].studentid,
      },
    });
  } catch (error) {
    console.error("Error validating student:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
