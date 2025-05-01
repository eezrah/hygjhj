import { pool } from "../../config/db.js";

export const multipleChoice = async (req, res) => {
  try {
    const { technicalAssessmentId } = req.params;
    
    if (!technicalAssessmentId) {
      return res.status(400).json({ success: false, message: "Technical assessment ID is required" });
    }
    
    // Using the assessmentmanagement_view_assessments_with_mc_questions view
    const query = `
      SELECT
        mc_questionid,
        mc_questiontext,
        mc_correctanswer,
        json_agg(
          json_build_object(
            'choiceId', mc_choiceid,
            'choiceText', mc_choicetext
          )
        ) AS choices
      FROM assessmentmanagement_view_assessments_with_mc_questions
      WHERE technicalassessmentid = $1
      GROUP BY mc_questionid, mc_questiontext, mc_correctanswer
    `;
    
    const result = await pool.query(query, [technicalAssessmentId]);
    
    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error("Error fetching multiple choice questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch multiple choice questions",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

export const createMultipleChoiceQuestion = async (req, res) => {
  try {
    const { technicalAssessmentId, questionText, correctAnswerText, choices } = req.body;
    
    if (!technicalAssessmentId || !questionText || !correctAnswerText || !choices || !Array.isArray(choices)) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: technicalAssessmentId, questionText, correctAnswerText, choices (array)" 
      });
    }
    
    const query = `
      CALL assessmentmanagement_create_mc_question($1, $2, $3, $4, NULL)
    `;
    
    const result = await pool.query(query, [
      technicalAssessmentId,
      questionText,
      correctAnswerText,
      choices
    ]);
    
    res.status(201).json({
      success: true,
      message: "Multiple choice question created successfully",
      questionId: result.rows[0]?.p_new_question_id
    });
  } catch (error) {
    console.error("Error creating multiple choice question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create multiple choice question",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

export const codingQuestions = async (req, res) => {
  try {
    const { technicalAssessmentId } = req.params;
    
    if (!technicalAssessmentId) {
      return res.status(400).json({ success: false, message: "Technical assessment ID is required" });
    }
    
    // Using the AssessmentManagement_view_coding_questions_with_testcases view
    const query = `
      SELECT
        codequestionid,
        codingquestiontext,
        correctreferencecode,
        json_agg(
          json_build_object(
            'testCaseId', admintestcaseid,
            'input', testcaseinput,
            'expectedOutput', testcaseexpectedoutput
          )
        ) AS testcases
      FROM AssessmentManagement_view_coding_questions_with_testcases
      WHERE technicalassessmentid = $1
      GROUP BY codequestionid, codingquestiontext, correctreferencecode
    `;
    
    const result = await pool.query(query, [technicalAssessmentId]);
    
    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error("Error fetching coding questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch coding questions",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

export const createCodingQuestion = async (req, res) => {
  try {
    const { technicalAssessmentId, codeQuestionText, correctReferenceCode } = req.body;
    
    if (!technicalAssessmentId || !codeQuestionText) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: technicalAssessmentId, codeQuestionText" 
      });
    }
    
    const query = `
      CALL assessmentmanagement_create_coding_question(NULL, $1, $2, $3)
    `;
    
    const result = await pool.query(query, [
      technicalAssessmentId,
      codeQuestionText,
      correctReferenceCode || null
    ]);
    
    res.status(201).json({
      success: true,
      message: "Coding question created successfully",
      codingQuestionId: result.rows[0]?.p_new_code_question_id
    });
  } catch (error) {
    console.error("Error creating coding question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create coding question",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

export const createCodingTestCase = async (req, res) => {
  try {
    const { codeQuestionId, testCaseInput, testCaseExpectedOutput } = req.body;
    
    if (!codeQuestionId || !testCaseInput || !testCaseExpectedOutput) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: codeQuestionId, testCaseInput, testCaseExpectedOutput" 
      });
    }
    
    const query = `
      CALL assessmentmanagement_create_coding_test_case(NULL, $1, $2, $3)
    `;
    
    const result = await pool.query(query, [
      codeQuestionId,
      testCaseInput,
      testCaseExpectedOutput
    ]);
    
    res.status(201).json({
      success: true,
      message: "Test case created successfully",
      testCaseId: result.rows[0]?.p_new_test_case_id
    });
  } catch (error) {
    console.error("Error creating coding test case:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create coding test case",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

export const essayQuestions = async (req, res) => {
  try {
    const { technicalAssessmentId } = req.params;
    
    if (!technicalAssessmentId) {
      return res.status(400).json({ success: false, message: "Technical assessment ID is required" });
    }
    
    // Using the assessmentmanagement_view_essay_questions view
    const query = `
      SELECT
        essayid,
        essayquestion
      FROM assessmentmanagement_view_essay_questions
      WHERE technicalassessmentid = $1
    `;
    
    const result = await pool.query(query, [technicalAssessmentId]);
    
    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error("Error fetching essay questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch essay questions",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

export const createEssayQuestion = async (req, res) => {
  try {
    const { technicalAssessmentId, essayQuestionText } = req.body;
    
    if (!technicalAssessmentId || !essayQuestionText) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: technicalAssessmentId, essayQuestionText" 
      });
    }
    
    const query = `
      CALL assessmentmanagement_create_essay_question($1, $2, NULL)
    `;
    
    const result = await pool.query(query, [
      technicalAssessmentId,
      essayQuestionText
    ]);
    
    res.status(201).json({
      success: true,
      message: "Essay question created successfully",
      essayQuestionId: result.rows[0]?.p_new_essay_question_id
    });
  } catch (error) {
    console.error("Error creating essay question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create essay question",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

export const technicalAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    
    if (!assessmentId) {
      return res.status(400).json({ success: false, message: "Assessment ID is required" });
    }
    
    // Get the assessment details
    const assessmentQuery = `
      SELECT technicalassessmentid, technicalassessmentname, creationdate
      FROM assessment_technicalassessments
      WHERE technicalassessmentid = $1
    `;
    
    const assessmentResult = await pool.query(assessmentQuery, [assessmentId]);
    
    if (assessmentResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Technical assessment not found" 
      });
    }
    
    const assessment = assessmentResult.rows[0];
    
    res.status(200).json({
      success: true,
      data: assessment
    });
  } catch (error) {
    console.error("Error fetching technical assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch technical assessment",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

export const createTechnicalAssessment = async (req, res) => {
  try {
    const { assessmentName } = req.body;
    
    if (!assessmentName) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required field: assessmentName" 
      });
    }
    
    const query = `
      CALL assessment_create_technical_assessment(NULL, $1)
    `;
    
    const result = await pool.query(query, [assessmentName]);
    
    res.status(201).json({
      success: true,
      message: "Technical assessment created successfully",
      assessmentId: result.rows[0]?.p_new_assessment_id
    });
  } catch (error) {
    console.error("Error creating technical assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create technical assessment",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

export const getAllTechnicalAssessments = async (req, res) => {
  try {
    // Using the assessmentmanagement_view_available_technical_assessments view
    const query = `
      SELECT technicalassessmentid, technicalassessmentname, creationdate
      FROM assessmentmanagement_view_available_technical_assessments
      ORDER BY creationdate DESC
    `;
    
    const result = await pool.query(query);
    
    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error("Error fetching all technical assessments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch technical assessments",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};
