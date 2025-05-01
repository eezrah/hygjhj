import { Routes, Route, useLocation } from "react-router-dom";
import AdminNavbar from "./components/AdminNavbar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

// Admin pages
import Admin from "./_pages/Admin";
import AdminDashboard from "./_pages/AdminDashboard";
import ApplicantForm from "./_pages/ApplicantForm";
import ApplicantProfile from "./_pages/ApplicantProfile";
import CreateExam from "./_pages/TechnicalAssessment/CreateExam";
import DisplayExam from "./_pages/TechnicalAssessment/DisplayExam";
import TechnicalAssessmentLandingPage from "./_pages/TechnicalAssessment/TechnicalAssessmentLandingPage";

function Metrobank() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Define pages where Navbar should be displayed with their titles
  const navbarConfig: Record<string, string> = {
    "/metrobank/admin": "Application Requirements",
    "/metrobank/applicantform": "Applicant Form",
    "/metrobank/applicantprofile": "Applicant Profile",
    "/metrobank/createexam": "Technical Assessment",
    "/metrobank/displayexam": "Technical Assessment Preview",
    "/metrobank/assessment": "Technical Assessment Results",
    "/metrobank/assessment/:studentId": "Technical Assessment Details"
  };

  // Define pages where Sidebar should be displayed
  const sidebarConfig: Record<string, boolean> = {
    "/metrobank/admindashboard": true,
    "/metrobank/admin": true,
    "/metrobank/applicantform": true,
    "/metrobank/applicantprofile": true,
    "/metrobank/createexam": true,
    "/metrobank/displayexam": true,
    "/metrobank/assessment": true,
    "/metrobank/assessment/:studentId": true,
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
          <AdminNavbar
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
        )}

        <Routes>
          <Route path="admindashboard" element={<AdminDashboard />} />
          <Route path="admin" element={<Admin />} />
          <Route path="applicantform/:studentId" element={<ApplicantForm />} />
          <Route path="applicantprofile/:studentId" element={<ApplicantProfile />} />
          <Route path="createexam" element={<CreateExam />} />
          <Route path="displayexam" element={<DisplayExam examData={JSON.parse(localStorage.getItem('examData') || '[]')} />} />
          <Route path="assessment" element={<TechnicalAssessmentLandingPage />} />
          <Route path="assessment/:studentId" element={<TechnicalAssessmentLandingPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default Metrobank;
