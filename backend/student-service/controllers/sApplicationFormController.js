import { pool } from "../../config/db.js";

// POST /personal-data
export const PostPersonalData = async (req, res) => {
  try {
    const {
      studentid,
      firstname,
      middlename,
      lastname,
      suffix,
      nickname,
      landlinenumber,
      mobilenumber,
      homeaddress,
      dateofbirth,
      age,
      gender,
      citizenship,
      civilstatus,
      religion,
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "studentid",
      "firstname",
      "middlename",
      "lastname",
      "suffix",
      "nickname",
      "landlinenumber",
      "mobilenumber",
      "homeaddress",
      "dateofbirth",
      "age",
      "gender",
      "citizenship",
      "civilstatus",
      "religion",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        fields: missingFields,
      });
    }

    // Convert types to match the stored procedure
    const parsedStudentId = parseInt(studentid);
    const parsedLandline = parseInt(landlinenumber);
    const parsedMobile = parseInt(mobilenumber);
    const parsedAge = parseInt(age);

    // Execute the exact same stored procedure that works in your database
    const query = `
      CALL insert_personal_data_with_join($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    `;

    await pool.query(query, [
      parsedStudentId, // p_studentid
      firstname, // p_firstname
      middlename, // p_middlename
      lastname, // p_lastname
      suffix, // p_suffix
      nickname, // p_nickname
      parsedLandline, // p_landlinenumber
      parsedMobile, // p_mobilenumber
      homeaddress, // p_homeaddress
      dateofbirth, // p_dateofbirth
      parsedAge, // p_age
      gender, // p_gender
      citizenship, // p_citizenship
      civilstatus, // p_civilstatus
      religion, // p_religion
    ]);

    res.status(201).json({
      success: true,
      message: "Personal data inserted successfully",
      data: {
        studentid: parsedStudentId,
        firstname,
        middlename,
        lastname,
        suffix,
        nickname,
        landlinenumber: parsedLandline,
        mobilenumber: parsedMobile,
        homeaddress,
        dateofbirth,
        age: parsedAge,
        gender,
        citizenship,
        civilstatus,
        religion,
      },
    });
  } catch (error) {
    console.error("Error in PostPersonalData:", error);
    res.status(500).json({
      error: "Failed to insert personal data",
      message: "An error occurred while inserting personal data",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// POST /student-info
export const PostStudentInfo = async (req, res) => {
  try {
    const { studentid, school, schooladdress, courseandyearlevel } = req.body;

    // Validate required fields
    const requiredFields = [
      "studentid",
      "school",
      "schooladdress",
      "courseandyearlevel",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        fields: missingFields,
      });
    }

    // Convert studentid to integer
    const parsedStudentId = parseInt(studentid);

    // Execute the exact same stored procedure that works in your database
    const query = `
      CALL applicationform_insert_student_information($1, $2, $3, $4)
    `;

    await pool.query(query, [
      parsedStudentId, // p_studentid
      school, // p_school
      schooladdress, // p_schooladdress
      courseandyearlevel, // p_courseandyearlevel
    ]);

    res.status(201).json({
      success: true,
      message: "Student information inserted successfully",
      data: {
        studentid: parsedStudentId,
        school,
        schooladdress,
        courseandyearlevel,
      },
    });
  } catch (error) {
    console.error("Error in PostStudentInfo:", error);
    res.status(500).json({
      error: "Failed to insert student information",
      message: "An error occurred while inserting student information",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// POST /student-yearlevel
export const PostStudentYearLevel = async (req, res) => {
  try {
    const { studentid, yearlevel } = req.body;

    // Validate required fields
    const requiredFields = ["studentid", "yearlevel"];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        fields: missingFields,
      });
    }

    // Convert studentid to integer
    const parsedStudentId = parseInt(studentid);

    // Execute the exact same stored procedure that works in your database
    const query = `
      CALL applicationform_insert_student_yearlevel($1, $2)
    `;

    await pool.query(query, [
      parsedStudentId, // p_studentid
      yearlevel, // p_yearlevel
    ]);

    res.status(201).json({
      success: true,
      message: "Student year level inserted successfully",
      data: {
        studentid: parsedStudentId,
        yearlevel,
      },
    });
  } catch (error) {
    console.error("Error in PostStudentYearLevel:", error);
    res.status(500).json({
      error: "Failed to insert student year level",
      message: "An error occurred while inserting student year level",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// POST /curricular-activities
export const PostCurricularActivities = async (req, res) => {
  try {
    const {
      p_studentid,
      p_position,
      p_organizations,
      p_significantcontribution,
      p_inclusiveyears,
      p_level,
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "p_studentid",
      "p_position",
      "p_organizations",
      "p_significantcontribution",
      "p_inclusiveyears",
      "p_level",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        fields: missingFields,
      });
    }

    // Convert studentid to integer
    const parsedStudentId = parseInt(p_studentid);

    const query = `
      CALL public.applicationform_insert_ecurricular_activities($1, $2, $3, $4, $5, $6)
    `;

    await pool.query(query, [
      parsedStudentId,
      p_position,
      p_organizations,
      p_significantcontribution,
      p_inclusiveyears,
      p_level,
    ]);

    res.status(201).json({
      success: true,
      message: "Extra-curricular activity inserted successfully",
      data: {
        p_studentid: parsedStudentId,
        p_position,
        p_organizations,
        p_significantcontribution,
        p_inclusiveyears,
        p_level,
      },
    });
  } catch (error) {
    console.error("Error in PostCurricularActivities:", error);
    res.status(500).json({
      error: "Failed to insert extra-curricular activity",
      message: "An error occurred while inserting extra-curricular activity",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// POST /awards
export const PostAward = async (req, res) => {
  try {
    const {
      p_studentid,
      p_rankandnameofaward,
      p_awarddescription,
      p_awardgivingbody,
      p_dateawarded,
      p_awardlevel,
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "p_studentid",
      "p_rankandnameofaward",
      "p_awarddescription",
      "p_awardgivingbody",
      "p_dateawarded",
      "p_awardlevel",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        fields: missingFields,
      });
    }

    // Convert studentid to integer
    const parsedStudentId = parseInt(p_studentid);

    const query = `
      CALL applicationform_insert_awards($1, $2, $3, $4, $5, $6)
    `;

    await pool.query(query, [
      parsedStudentId,
      p_rankandnameofaward,
      p_awarddescription,
      p_awardgivingbody,
      p_dateawarded,
      p_awardlevel,
    ]);

    res.status(201).json({
      success: true,
      message: "Award inserted successfully",
      data: {
        p_studentid: parsedStudentId,
        p_rankandnameofaward,
        p_awarddescription,
        p_awardgivingbody,
        p_dateawarded,
        p_awardlevel,
      },
    });
  } catch (error) {
    console.error("Error in PostAward:", error);
    res.status(500).json({
      error: "Failed to insert award",
      message: "An error occurred while inserting award",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// POST /community-involvement
export const PostCommunityInvolvement = async (req, res) => {
  try {
    const {
      p_studentid,
      p_communityactivities,
      p_activitydescription,
      p_communityrole,
      p_inclusiveyears,
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "p_studentid",
      "p_communityactivities",
      "p_activitydescription",
      "p_communityrole",
      "p_inclusiveyears",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        fields: missingFields,
      });
    }

    // Convert studentid to integer
    const parsedStudentId = parseInt(p_studentid);

    const query = `
      CALL public.applicationform_insert_community_involvement($1, $2, $3, $4, $5)
    `;

    await pool.query(query, [
      parsedStudentId,
      p_communityactivities,
      p_activitydescription,
      p_communityrole,
      p_inclusiveyears,
    ]);

    res.status(201).json({
      success: true,
      message: "Community involvement inserted successfully",
      data: {
        p_studentid: parsedStudentId,
        p_communityactivities,
        p_activitydescription,
        p_communityrole,
        p_inclusiveyears,
      },
    });
  } catch (error) {
    console.error("Error in PostCommunityInvolvement:", error);
    res.status(500).json({
      error: "Failed to insert community involvement",
      message: "An error occurred while inserting community involvement",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// POST /parents
export const PostParents = async (req, res) => {
  try {
    const {
      p_studentid,
      p_fullname,
      p_age,
      p_relation,
      p_occupation,
      p_presentemployment,
      p_designation,
      p_grossannualincome,
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "p_studentid",
      "p_fullname",
      "p_age",
      "p_relation",
      "p_occupation",
      "p_presentemployment",
      "p_designation",
      "p_grossannualincome",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        fields: missingFields,
      });
    }

    // Convert numeric fields
    const parsedStudentId = parseInt(p_studentid);
    const parsedAge = parseInt(p_age);
    const parsedIncome = parseFloat(p_grossannualincome);

    // Execute the stored procedure
    const query = `
      CALL public.applicationform_insert_family_reference_parent($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    await pool.query(query, [
      parsedStudentId,
      p_fullname,
      parsedAge,
      p_relation,
      p_occupation,
      p_presentemployment,
      p_designation,
      parsedIncome,
    ]);

    res.status(201).json({
      success: true,
      message: "Parent information inserted successfully",
      data: {
        p_studentid: parsedStudentId,
        p_fullname,
        p_age: parsedAge,
        p_relation,
        p_occupation,
        p_presentemployment,
        p_designation,
        p_grossannualincome: parsedIncome,
      },
    });
  } catch (error) {
    console.error("Error in PostParents:", error);
    res.status(500).json({
      error: "Failed to insert parent information",
      message: "An error occurred while inserting parent information",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// POST /siblings-studying
export const PostSiblingsStudying = async (req, res) => {
  try {
    const {
      p_studentid,
      p_siblingname,
      p_siblingschoolandaddress,
      p_courseyearlevel,
      p_siblingprivilege,
      p_name_of_scholarship,
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "p_studentid",
      "p_siblingname",
      "p_siblingschoolandaddress",
      "p_courseyearlevel",
      "p_siblingprivilege",
      "p_name_of_scholarship",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        fields: missingFields,
      });
    }

    // Convert studentid to integer
    const parsedStudentId = parseInt(p_studentid);

    const query = `
      CALL public.applicationform_insert_family_siblings_studying($1, $2, $3, $4, $5, $6)
    `;

    await pool.query(query, [
      parsedStudentId,
      p_siblingname,
      p_siblingschoolandaddress,
      p_courseyearlevel,
      p_siblingprivilege,
      p_name_of_scholarship,
    ]);

    res.status(201).json({
      success: true,
      message: "Sibling studying information inserted successfully",
      data: {
        p_studentid: parsedStudentId,
        p_siblingname,
        p_siblingschoolandaddress,
        p_courseyearlevel,
        p_siblingprivilege,
        p_name_of_scholarship,
      },
    });
  } catch (error) {
    console.error("Error in PostSiblingsStudying:", error);
    res.status(500).json({
      error: "Failed to insert sibling studying information",
      message: "An error occurred while inserting sibling studying information",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// POST /siblings-not-studying
export const PostSiblingsNotStudying = async (req, res) => {
  try {
    const { p_studentid, p_siblingname, p_age, p_occupation, p_monthlyincome } =
      req.body;

    // Validate required fields
    const requiredFields = [
      "p_studentid",
      "p_siblingname",
      "p_age",
      "p_occupation",
      "p_monthlyincome",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        fields: missingFields,
      });
    }

    // Convert numeric fields
    const parsedStudentId = parseInt(p_studentid);
    const parsedAge = parseInt(p_age);
    const parsedMonthlyIncome = parseFloat(p_monthlyincome);

    const query = `
      CALL public.applicationform_insert_family_siblings_not_studying($1, $2, $3, $4, $5)
    `;

    await pool.query(query, [
      parsedStudentId,
      p_siblingname,
      parsedAge,
      p_occupation,
      parsedMonthlyIncome,
    ]);

    res.status(201).json({
      success: true,
      message: "Sibling not studying information inserted successfully",
      data: {
        p_studentid: parsedStudentId,
        p_siblingname,
        p_age: parsedAge,
        p_occupation,
        p_monthlyincome: parsedMonthlyIncome,
      },
    });
  } catch (error) {
    console.error("Error in PostSiblingsNotStudying:", error);
    res.status(500).json({
      error: "Failed to insert sibling not studying information",
      message:
        "An error occurred while inserting sibling not studying information",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
