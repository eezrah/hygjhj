import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InterviewScheduleForm: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMode1, setSelectedMode1] = useState<string>("");
  const [selectedMode2, setSelectedMode2] = useState<string>("");
  const [selectedMode3, setSelectedMode3] = useState<string>("");

  const handleNextClick = () => {
    navigate("/student/interviewschedulesummary");
  };

  return (
    <div
      className="flex flex-col min-h-screen relative"
      style={{ background: "linear-gradient(to bottom right, #ffffff, #ebf8ff)" }}
    >
      <main className="flex-1 p-5 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-3">
          {/* Progress Bar */}
          <ProgressTracker />

          {/* Container 1 - Choose Interview Mode */}
          <Container
            title="Choose Mode of Interview:"
            description="Select your preferred interview method: online via MS Teams or onsite at your designated STI campus."
            selectedMode={selectedMode1}
            setSelectedMode={setSelectedMode1}
            options={[
              {
                label: "Onsite",
                description:
                  "Attend your interview in person at the assigned STI campus. You'll choose from available dates, times, and venues.",
              },
              {
                label: "Online",
                description:
                  "Join your interview remotely via Microsoft Teams. Once scheduled, a link will be provided.",
              },
            ]}
          />

          {/* Container 2 - Choose Interview Date */}
          <Container
            title="Date of Interview:"
            description="Select a preferred date slot for your interview from the available options."
            selectedMode={selectedMode2}
            setSelectedMode={setSelectedMode2}
            options={[
              { label: "July 27, 2025", description: "" },
              { label: "July 28, 2025", description: "" },
              { label: "July 29, 2025", description: "" },
            ]}
          />

          {/* Container 3 - Choose Interview Time Preference */}
          <Container
            title="Choose Time Preference:"
            description="Select your preferred time for the interview session."
            selectedMode={selectedMode3}
            setSelectedMode={setSelectedMode3}
            options={[
              { label: "1:30 PM", description: "" },
              { label: "2:00 PM", description: "" },
              { label: "2:30 PM", description: "" },
              { label: "3:00 PM", description: "" },
              { label: "3:30 PM", description: "" },
              { label: "4:00 PM", description: "" },
              { label: "4:30 PM", description: "" },
              { label: "5:00 PM", description: "" },
            ]}
          />

          {/* Next Button (moved here after Container 3) */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleNextClick}
              className="text-sm bg-blue-600 text-white px-9 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center shadow-lg"
            >
              Next Page
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

interface ContainerProps {
  title: string;
  description: string;
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
  options: { label: string; description: string }[];
}

const Container: React.FC<ContainerProps> = ({
  title,
  description,
  selectedMode,
  setSelectedMode,
  options,
}) => {
  const isSelected = selectedMode !== "";

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mt-8">
      <h2 className="text-blue-700 text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 text-sm">{description}</p>

      {title.includes("Mode of Interview") ? (
        // Container 1: Detailed selection
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[1100px]">
          {options.map((option) => (
            <label
              key={option.label}
              onClick={() => setSelectedMode(option.label)}
              className={`relative flex flex-col items-start p-5 border rounded-lg cursor-pointer transition w-[499px] ${
                selectedMode === option.label
                  ? "border-blue-600 shadow-lg bg-blue-50"
                  : isSelected
                  ? "border-gray-400 hover:shadow-md"
                  : "border-gray-400 hover:shadow-md"
              }`}
            >
              <span className="flex items-center mb-2">
                <input
                  type="radio"
                  name={title}
                  className="appearance-none w-5 h-5 rounded-full border-2 border-blue-600 checked:bg-blue-500 checked:border-blue-600 focus:outline-none mr-3"
                  checked={selectedMode === option.label}
                  readOnly
                />
                <span className="text-blue-600 font-semibold">{option.label}</span>
              </span>
              <p className="text-gray-500 text-sm">{option.description}</p>
            </label>
          ))}
        </div>
      ) : (
        // Container 2 & 3: Clean button style
        <div className="flex flex-wrap gap-4 justify-center">
          {options.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => setSelectedMode(option.label)}
              className={`px-6 py-4 border rounded-lg text-sm font-semibold w-[330px] transition-all ${
                selectedMode === option.label
                  ? "bg-blue-50 text-blue-600 border-blue-600"
                  : "bg-white text-gray-700 border-gray-400 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
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

export default InterviewScheduleForm;
