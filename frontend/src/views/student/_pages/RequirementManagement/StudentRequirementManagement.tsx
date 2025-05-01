import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentRequirementManagement: React.FC = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/student/studentpersonaldata"); // Replace with the actual path to the StudentSubmitApplication page
  };

  return (
    <div
      className="flex h-screen"
      style={{ backgroundColor: "var(--custom-whitebg)" }}
    >
      <main className="flex-1 p-5">
        <div className="max-w-5xl mx-auto p-6">
          {/* Progress Bar */}
          <ProgressTracker />

          {/* Requirements */}
          <RequirementsList />

          {/* Next Button */}
          <div className="mt-6 text-right">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mt-6"
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const ProgressTracker: React.FC = () => {
  const steps = [
    { step: 1, label: "Details and Eligibility", isActive: true },
    { step: 2, label: "Application Form", isActive: false },
    { step: 3, label: "Requirements", isActive: false },
    { step: 4, label: "Application Status", isActive: false },
  ];

  return (
    <div className="flex items-center justify-center space-x-15 mb-2 pb-4">
      {steps.map(({ step, label, isActive }) => (
        <div key={step} className="flex flex-col items-center relative">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-semibold text-sm ${
              isActive
                ? "bg-blue-600 text-white border-blue-600"
                : "text-blue-600 border-blue-600"
            }`}
          >
            {step}
          </div>
          <span className="text-xs text-blue-600 mt-2">{label}</span>
          {step !== steps.length && (
            <div className="absolute top-5 left-19 w-30 h-0.5 bg-blue-600" />
          )}
        </div>
      ))}
    </div>
  );
};

const RequirementsList: React.FC = () => {
  const studentRequirements: string[] = [
    "Must be 2nd and 3rd-year Bachelor of Science in Information Technology & Bachelor of Science in Computer Science students.",
    "Application Form",
    "Cover Letter",
  ];

  const additionalRequirements: string[] = [
    "To be submitted during the Contract Signing process:",
    "Birth Certificate",
    "Medical Certificate",
    "Affidavit of No Existing Scholarship",
    "Proof of Parents' Income",
  ];

  const registrarRequirements: string[] = [
    "Scholastic Standing: No grades below 85% in all major subjects.",
    "Certificate of Good Moral Character",
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-blue-900 mb-3 mt-10">
        Requirements Needed:
      </h2>
      {studentRequirements.map((req, index) => (
        <RequirementItem key={index} text={req} />
      ))}

      {/* Line break */}
      <div className="mt-4 mb-4">
        <p className="text-md font-semibold text-blue-900 mb-2">
          To be submitted during the Contract Signing process:
        </p>
      </div>

      {additionalRequirements.slice(1).map((req, index) => (
        <RequirementItem key={index} text={req} />
      ))}

      <div className="mt-6">
        <h3 className="text-md font-semibold text-blue-900 mb-2">
          To be uploaded by the Registrar:
        </h3>
        {registrarRequirements.map((req, index) => (
          <RequirementItem key={index} text={req} />
        ))}
      </div>
    </div>
  );
};

const RequirementItem: React.FC<{ text: string }> = ({ text }) => {
  return <p className={`text-gray-600 text-xs mb-2 font-light`}>• {text}</p>;
};

export default StudentRequirementManagement;
