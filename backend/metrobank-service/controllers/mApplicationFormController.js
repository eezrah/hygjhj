import { pool } from "../../config/db.js";
//http://localhost:6001/api/metrobank

//req.params → Used for getting a specific record
//req.body → Used for sending data in POST or PUT requests
//req.query → Used for filtering results dynamically
//No req Used for getting all without filtering


// GET /personal-data/:studentid
export const GetPersonalData = async (req, res) => {
  try {
    const { studentid } = req.params;
    if (!studentid) {
      return res.status(400).json({ message: "Missing studentid in route parameters" });
    }

    // Query the formatted student data
    const query = "SELECT * FROM get_formatted_student_data($1);";
    const result = await pool.query(query, [studentid]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No data found for this studentid" });
    }

    // Return the formatted data
    res.status(200).json({
    PersonalData: result.rows[0],
      message: "Personal data retrieved successfully"
    });
  } catch (error) {
    console.error("Error in GetPersonalData:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
// GET /student-info/:studentid
export const GetStudentInfo = async (req, res) => {
  try {
    const { studentid } = req.params;
    if (!studentid) {
        return res.status(400).json({ message: "Missing studentid in route parameters" });
    }

    // Query the formatted student data
    const query = "SELECT * FROM get_student_info($1);";
    const result = await pool.query(query, [studentid]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "No data found for this studentid",
      });
    }

    // Return the formatted data
    res.status(200).json({
      data: result.rows[0],
      message: "Student information retrieved successfully",
    });
  } catch (error) {
    console.error("Error in GetPersonalData:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
// GET /curricular-activities/:studentid
export const GetCurricularActivities = async (req, res) => {
  try {
    const { studentid } = req.params;
    if (!studentid) {
      return res.status(400).json({ message: "Missing studentid in route parameters" });
    }

    
    const query = "SELECT * FROM get_student_ecurricular_activities($1);";
    const result = await pool.query(query, [studentid]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No curricular activities found for this studentid" });
    }

    res.status(200).json({
      data: result.rows,
      message: "Curricular activities retrieved successfully"
    });
  } catch (error) {
    console.error("Error in GetCurricularActivities:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
// GET /community-involvement/:studentid
export const GetCommuniityInvolvedment = async (req, res) => {
  try {
    const { studentid } = req.params;
    if (!studentid) {
      return res.status(400).json({ message: "Missing studentid in route parameters" });
    }

    const query = "SELECT * FROM get_community_involvement($1);";
    const result = await pool.query(query, [studentid]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No community involvement found for this studentid" });
    }

    res.status(200).json({
      data: result.rows,
      message: "Community involvement retrieved successfully"
    });
  } catch (error) {
    console.error("Error in GetCommuniityInvolvedment:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
// GET /family-reference/:studentid
export const GetFamilyReference = async (req, res) => {
  try {
    const { studentid } = req.params;
    if (!studentid) {
      return res.status(400).json({ message: "Missing studentid in route parameters" });
    }

    // Run all three queries in parallel
    const [parentsResult, studyingSiblingsResult, notStudyingSiblingsResult] = await Promise.all([
      pool.query("SELECT * FROM get_parents($1);", [studentid]),
      pool.query("SELECT * FROM get_studying_siblings($1);", [studentid]),
      pool.query("SELECT * FROM get_not_studying_siblings($1);", [studentid]),
    ]);

    res.status(200).json({
      parents: parentsResult.rows,
      studyingSiblings: studyingSiblingsResult.rows,
      notStudyingSiblings: notStudyingSiblingsResult.rows,
      message: "Family reference data retrieved successfully"
    });
  } catch (error) {
    console.error("Error in GetFamilyReference:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

