import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const InterviewManagementOverview: React.FC = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/student/interviewscheduleform"); // Replace with actual next page
  };

  return (
    <div className="flex h-screen " style={{ background: "linear-gradient(to bottom right, #ffffff, #ebf8ff)" }}>
      <main className="flex-1 p-5 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6">
          {/* Progress Bar */}
          <ProgressTracker />

          {/* Overview Content */}
          <div className="bg-white rounded-2xl shadow-lg w-[1100px] p-8 mt-2 ">
            <InterviewOverview />
            
            {/* Next Button */}
            <div className="mt-6 text-right">
              <button
                onClick={handleNextClick}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                Next Page
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
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
      {steps.map((step, index) => (
        <div key={step.step} className="flex flex-col items-center relative">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-semibold text-sm ${
              step.isActive
                ? "bg-blue-600 text-white border-blue-600"
                : "text-blue-600 border-blue-600"
            }`}
          >
            {step.step}
          </div>
          <span className="text-xs text-blue-600 mt-2">{step.label}</span>
          {index < steps.length - 1 && (
            <div className="absolute top-5 left-19 w-30 h-0.5 bg-blue-600" />
          )}
        </div>
      ))}
    </div>
  );
};

const InterviewOverview: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-blue-900 mb-3 mt-10">
        Interview Scheduling Overview:
      </h2>
      <p className="text-gray-600 text-sm mb-7 font-light">
        The Interview Scheduling process allows you to book your interview at your convenience. Please follow the instructions carefully to ensure your slot is reserved properly.
      </p>

      <h3 className="text-md font-semibold text-blue-900 mb-3">Reminders:</h3>
      <ul className="list-disc pl-5">
        <li className="text-gray-600 text-sm mb-2 font-light">
          Schedule your interview immediately after receiving the notification.
        </li>
        <li className="text-gray-600 text-sm mb-2 font-light">
          Choose your preferred available time slot carefully.
        </li>
        <li className="text-gray-600 text-sm mb-2 font-light">
          Attend the interview at least 10 minutes earlier.
        </li>
        <li className="text-gray-600 text-sm mb-2 font-light">
          Bring a valid ID and required documents for verification.
        </li>
        <li className="text-gray-600 text-sm mb-2 font-light">
          Missed interviews without valid reason may affect your application.
        </li>
        <li className="text-gray-600 text-sm mb-2 font-light">
          Contact the support team if you encounter any technical issues.
        </li>
      </ul>
    </div>
  );
};

export default InterviewManagementOverview;
