import React from "react";
import { useNavigate } from "react-router-dom";
import { Building2, MapPin, Calendar, Clock } from "lucide-react"; // Lucide icons

const InterviewScheduleSummary: React.FC = () => {
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    navigate("/student/interviewconfirmed");
  };

  return (
    <div
      className="flex flex-col min-h-screen relative"
      style={{ background: "linear-gradient(to bottom right, #ffffff, #ebf8ff)" }}
    >
      <main className="flex-1 p-5 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-9">
          {/* Progress Tracker */}
          <ProgressTracker />

          {/* Interview Summary Content */}
          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Left Card - Onsite Interview */}
              <div className="bg-white rounded-xl shadow-md p-9">
                <div className="flex items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-blue-700 text-2xl font-bold">Onsite <br /> Interview</h2>
                  </div>
                  <div className="bg-blue-500 text-white p-3 rounded-full">
                    <Building2 className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-gray-500 mb-4 text-sm">
                  Attend your interview in person at the assigned STI campus. You'll choose from
                  available dates, times, and venues.
                </p>
              </div>

              {/* Right Card - Interview Details */}
              <div className="bg-white rounded-xl shadow-md p-9">
                <h2 className="text-blue-700 text-xl font-bold mb-4">Interview Details:</h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="text-blue-500 mr-3 w-5 h-5" />
                    <span className="text-gray-500 text-sm">STI Ortigas-Cainta</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="text-blue-500 mr-3 w-5 h-5" />
                    <span className="text-gray-500 text-sm">December 27, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="text-blue-500 mr-3 w-5 h-5" />
                    <span className="text-gray-500 text-sm">9:00 AM</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Interview Reminder Styled as Confirmation */}
            <div className="bg-green-100 border border-green-300 text-gray-700 rounded-xl px-6 py-5 mt-5">
              <p className="font-semibold text-green-700 mb-1">Note:</p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>You may reschedule a week before the Interview Schedule</li>
              </ul>
            </div>

            {/* Back and Confirm Buttons */}
            <div className="flex justify-end mt-5 space-x-[5px]">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-200 text-gray-700 px-8 py-2 rounded-lg hover:bg-gray-300 transition duration-300 shadow-md"
              >
                Back
              </button>
              <button
                onClick={handleConfirmClick}
                className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Progress Tracker Component
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
          <span className="text-xs text-blue-600 mt-2 text-center">{step.label}</span>
          {index < steps.length - 1 && (
            <div className="absolute top-5 left-19 w-30 h-0.5 bg-blue-600" />
          )}
        </div>
      ))}
    </div>
  );
};

export default InterviewScheduleSummary;
