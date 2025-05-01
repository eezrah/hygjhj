import { pool } from "../../config/db.js";

//req.params → Used for getting a specific record
//req.body → Used for sending data in POST or PUT requests
//req.query → Used for filtering results dynamically
//No req Used for getting all without filtering

// Get ALL students
export const getAllStudents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_current_application_status()");

    res.status(200).json({
      total: result.rowCount,
      students: result.rows,
    });
  } catch (error) {
    console.error("Error in getAllStudents:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ message: "Missing studentId in route parameters" });
  }

  try {
    const query = " SELECT * FROM get_current_application_status() WHERE student_id = $1";
    const result = await pool.query(query, [studentId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      student: result.rows[0],
    });
  } catch (error) {
    console.error("Error in getStudentById:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
// Get attachment (to be implemented)
export const getAttachment = (req, res) => {};

// Approve student application
export const putApprovedApplication = async (req, res) => {
  const { student_id } = req.body;

  if (!student_id) {
    return res.status(400).json({
      message: "student_id is required in the request body",
    });
  }

  try {
    // EZRAH NEED TO ADD THE QUERY FOR APPROVED APPLICATION

    // const query = `
    //   UPDATE scholarinformationmasterlist
    //   SET current_status = 'APPROVED'
    //   WHERE student_id = $1
    //   RETURNING *;
    // `;
    const result = await pool.query(query, [student_id]);
    const updatedStudent = result.rows[0];

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student status updated to APPROVED",
      student: updatedStudent,
    });
  } catch (err) {
    console.error("Error updating application:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Deny student application
export const putDeniedApplication = async (req, res) => {
  const { student_id } = req.body;

  if (!student_id) {
    return res.status(400).json({
      message: "student_id is required in the request body",
    });
  }

  try {
    //  EZRAH NEED TO ADD THE QUERY FOR DENIED APPLICATION

    // const query = `
    //   UPDATE scholarinformationmasterlist
    //   SET current_status = 'DENIED'
    //   WHERE student_id = $1
    //   RETURNING *;
    // `;
    const result = await pool.query(query, [student_id]);
    const updatedStudent = result.rows[0];

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student status updated to DENIED",
      student: updatedStudent,
    });
  } catch (err) {
    console.error("Error updating application:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
