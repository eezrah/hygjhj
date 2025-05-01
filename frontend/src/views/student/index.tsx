import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/SidebarStudent";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";

// Student main pages
import StudentDashboard from "./_pages/StudentDashboard";
import StudentApplicationStatus from "./_pages/RequirementManagement/StudentApplicationStatus";
import StudentAddAttachment from "./_pages/RequirementManagement/StudentAddAttachment";
import StudentLogin from "./_pages/StudentLogin";
import StudentSignup from "./_pages/StudentSignup";
import StudentSubmitApplication from "./_pages/RequirementManagement/StudentSubmitApplication";
import StudentRequirementManagement from "./_pages/RequirementManagement/StudentRequirementManagement";

// Application Form pages
import StudentApplicationForm from "./_pages/ApplicationForm/StudentApplicationForm";
import StudentExtracurricularActivities from "./_pages/ApplicationForm/StudentExtracurricularActivities";
import StudentFamilyReference from "./_pages/ApplicationForm/StudentFamilyReference";
import StudentInformation from "./_pages/ApplicationForm/StudentInformation";
import StudentPersonalData from "./_pages/ApplicationForm/StudentPersonalData";
import StudentTermsandConditions from "./_pages/ApplicationForm/StudentTermsandConditions";
import StudentUploadPhoto from "./_pages/ApplicationForm/StudentUploadPhoto";

// Technical Assessment pages
import QuestionA from "./_pages/TechnicalAssessment/TechnicalAssessmentQuestions/QuestionA";
import QuestionB from "./_pages/TechnicalAssessment/TechnicalAssessmentQuestions/QuestionB";
import QuestionC from "./_pages/TechnicalAssessment/TechnicalAssessmentQuestions/QuestionC";
import QuestionD from "./_pages/TechnicalAssessment/TechnicalAssessmentQuestions/QuestionD";
import QuestionE from "./_pages/TechnicalAssessment/TechnicalAssessmentQuestions/QuestionE";
import StudentTechnicalAssessmentOverview from "./_pages/TechnicalAssessment/StudentTechnicalAssessmentOverview";
import TechnicalAssessmentManagement from "./_pages/TestPages/asd";

// Interview Management pages
import InterviewManagementOverview from "./_pages/InterviewManagement/InterviewManagementOverview";

function Student() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Define pages where Navbar should be displayed with their titles
  const navbarConfig: Record<string, string> = {
    "/student/studentapplicationstatus": "Requirement Management",
    "/student/studentaddattachment": "Requirement Management",
    "/student/studentsubmitapplication": "Requirement Management",
    "/student/studentrequirementmanagement": "Requirement Management",
    "/student/studentapplicationform": "Requirement Management",
    "/student/studentextracurricularactivities": "Requirement Management",
    "/student/studentfamilyreference": "Requirement Management",
    "/student/studentinformation": "Requirement Management",
    "/student/studentpersonaldata": "Requirement Management",
    "/student/studenttermsandconditions": "Requirement Management",
    "/student/studentuploadphoto": "Requirement Management",
    "/student/studenttechnicalassessmentoverview": "Technical Assessment",
    "/student/technicalassessment/questiona": "Technical Assessment",
    "/student/technicalassessment/questionb": "Technical Assessment",
    "/student/technicalassessment/questionc": "Technical Assessment",
    "/student/technicalassessment/questiond": "Technical Assessment",
    "/student/technicalassessment/questione": "Technical Assessment",
    "/student/technicalassessmentmanagement": "Technical Assessment Management",
    "/student/interviewmanagementoverview": "Interview Management",
  };

  // Define pages where Sidebar should be displayed
  const sidebarConfig: Record<string, boolean> = {
    "/student/studentdashboard": true,
    "/student/studentapplicationstatus": true,
    "/student/studentaddattachment": true,
    "/student/studentsubmitapplication": true,
    "/student/studentrequirementmanagement": true,
    "/student/studentapplicationform": true,
    "/student/studentextracurricularactivities": true,
    "/student/studentfamilyreference": true,
    "/student/studentinformation": true,
    "/student/studentpersonaldata": true,
    "/student/studenttermsandconditions": true,
    "/student/studentuploadphoto": true,
    "/student/studenttechnicalassessmentoverview": true,
    "/student/technicalassessment/questiona": true,
    "/student/technicalassessment/questionb": true,
    "/student/technicalassessment/questionc": true,
    "/student/technicalassessment/questiond": true,
    "/student/technicalassessment/questione": true,
    "/student/technicalassessmentmanagement": true,
    "/student/interviewmanagementoverview": true,
  };

  // Check if navbar should be displayed and get the page title
  const pageTitle = navbarConfig[location.pathname] || "";
  const showNavbar = !!pageTitle;
  const showSidebar = sidebarConfig[location.pathname] || false;

  return (
    <div className="flex h-screen bg-gray-100">
      {showSidebar && <Sidebar />}
      <div className="flex-1 overflow-auto">
        {showNavbar && (
          <Navbar
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            pageTitle={pageTitle}
          />
        )}

        <Routes>
          {/* Public Routes */}
          <Route path="studentlogin" element={<StudentLogin />} />
          <Route path="studentsignup" element={<StudentSignup />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute requiredRole={1} />}>
            {/* Dashboard */}
            <Route path="studentdashboard" element={<StudentDashboard />} />
            
            {/* Requirement Management */}
            <Route path="studentapplicationstatus" element={<StudentApplicationStatus />} />
            <Route path="studentaddattachment" element={<StudentAddAttachment />} />
            <Route path="studentsubmitapplication" element={<StudentSubmitApplication />} />
            <Route path="studentrequirementmanagement" element={<StudentRequirementManagement />} />
            
            {/* Application Form */}
            <Route path="studentapplicationform" element={<StudentApplicationForm />} />
            <Route path="studentextracurricularactivities" element={<StudentExtracurricularActivities />} />
            <Route path="studentfamilyreference" element={<StudentFamilyReference />} />
            <Route path="studentinformation" element={<StudentInformation />} />
            <Route path="studentpersonaldata" element={<StudentPersonalData />} />
            <Route path="studenttermsandconditions" element={<StudentTermsandConditions />} />
            <Route path="studentuploadphoto" element={<StudentUploadPhoto />} />
            
            {/* Technical Assessment */}
            <Route path="studenttechnicalassessmentoverview" element={<StudentTechnicalAssessmentOverview />} />
            <Route path="technicalassessment/questiona" element={<QuestionA />} />
            <Route path="technicalassessment/questionb" element={<QuestionB />} />
            <Route path="technicalassessment/questionc" element={<QuestionC />} />
            <Route path="technicalassessment/questiond" element={<QuestionD />} />
            <Route path="technicalassessment/questione" element={<QuestionE />} />
            <Route path="technicalassessmentmanagement" element={<TechnicalAssessmentManagement />} />
            
            {/* Interview Management */}
            <Route path="interviewmanagementoverview" element={<InterviewManagementOverview />} />
          </Route>

          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/student/studentlogin" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default Student;
