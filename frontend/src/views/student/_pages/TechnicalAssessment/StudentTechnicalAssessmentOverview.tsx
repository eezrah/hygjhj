import React from "react";
import { useNavigate } from "react-router-dom";

const StudentTechnicalAssessmentOverview: React.FC = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/student/technicalassessment/questiona"); // Replace with the actual path to the Technical Assessment page
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "var(--custom-whitebg)" }}
    >
      <main className="flex-1 p-4">
        <div className="max-w-5xl mx-auto p-4">
          {/* Progress Bar */}
          <ProgressTracker />

          {/* Technical Assessment Overview Content */}
          <TechnicalAssessmentOverview />

          {/* Next Button */}
          <div className="mt-6 text-right">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mt-4"
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
    { step: 1, label: "Overview", isActive: true },
    { step: 2, label: "Technical Assessment", isActive: false },
    { step: 3, label: "Results", isActive: false },
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

const TechnicalAssessmentOverview: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-blue-900 mb-3 mt-10">
        Technical Assessment Overview:
      </h2>
      <p className="text-gray-600 text-sm mb-7 font-light">
        The Technical Assessment is designed to evaluate your problem-solving
        skills and technical knowledge. You will be tested on your ability to
        apply concepts and solve real-world challenges using the relevant
        technology.
      </p>

      <h3 className="text-md font-semibold text-blue-900 mb-3">Reminders:</h3>
      <ul className="list-disc pl-5">
        <li className="text-gray-600 text-sm mb-2 font-light">
          The exam must be completed in a single sitting.
        </li>
        <li className="text-gray-600 text-sm mb-2 font-light">
          The timer will start when you begin the exam. You must complete it
          within the specified time limit.
        </li>
        <li className="text-gray-600 text-sm mb-2 font-light">
          Do not refresh or switch tabs during the exam; any suspicious activity
          may result in disqualification.
        </li>
        <li className="text-gray-600 text-sm mb-2 font-light">
          If you face any issues during the exam, please reach out to support
          immediately.
        </li>
        <li className="text-gray-600 text-sm mb-2 font-light">
          The exam will be available only on the designated date and within the
          scheduled time window.
        </li>
        <li className="text-gray-600 text-sm mb-2 font-light">
          Your results will be available immediately after completing the exam.
        </li>
        <li className="text-gray-600 text-sm mb-2 font-light">
          Any form of misconduct will result in disqualification.
        </li>
        <li className="text-gray-600 text-sm mb-2 font-light">
          The schedule of exams will be announced on this site. Please check
          back regularly to confirm your allocated exam time.
        </li>
      </ul>
    </div>
  );
};

export default StudentTechnicalAssessmentOverview;
