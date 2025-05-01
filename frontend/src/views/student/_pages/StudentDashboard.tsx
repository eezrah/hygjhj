import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { resetAuthCache } from "../../../utils/authUtils";
import {
  FileText,
  Calendar,
  LogOut,
  ChevronDown,
  ChevronRight,
  Pencil,
  BookOpenCheck,
} from "lucide-react";

const StudentDashboard: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the backend logout endpoint to clear cookies
      await axios.post(
        "http://localhost:6003/api/student/logout",
        {},
        { withCredentials: true } // Important for cookies to be cleared
      );
      
      // Clear local storage
      localStorage.removeItem("user");
      
      // Reset auth cache
      resetAuthCache();
      
      // Navigate to login page
      navigate("/student/studentlogin");
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to logout. Please try again.");
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex h-screen"
      style={{ backgroundColor: "var(--custom-whitebg)" }}
    >
      <main className="flex-1 p-5">
        <Header 
          dropdownOpen={dropdownOpen} 
          setDropdownOpen={setDropdownOpen} 
          handleLogout={handleLogout}
        />
        <div className="pl-5">
          <div className="relative">
            <Banner />
            <StatusTracker
              progress={25}
              stepSpacing="mb-5"
              steps={[
                "Application Submission",
                "Documents Validation",
                "Technical Examination",
                "Interview",
                "Signing of Contract",
              ]}
            />
          </div>
          <div className="mt-4 flex justify-start">
            <DashboardCards />
          </div>
        </div>
        <InfoSections />
      </main>
    </div>
  );
};

// Header Component
function Header({
  dropdownOpen,
  setDropdownOpen,
  handleLogout,
}: {
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  handleLogout: () => void;
}) {
  return (
    <div className="flex justify-between items-center mb-2">
      <div>
        <p className="text-sm text-gray-500 pl-5 mt-2">Hello, Student!</p>
        <h1 className="text-2xl font-bold text-blue-700 pl-5">Dashboard</h1>
      </div>
      <div className="relative">
        <button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
        >
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500 pl-5 mt-2 pr-5">
              Evangelista, Julcris C.
            </p>
            <p className="text-xs text-gray-500 pr-5">STI Ortigas-Cainta</p>
          </div>
          <img
            src="/vaunia.png"
            alt="Student Profile"
            className="w-10 h-10 rounded-full"
          />
          <ChevronDown className="w-4 h-4" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md p-2 z-10">
            <button 
              className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200 text-custom-gray text-sm"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" /> Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Banner Component
function Banner() {
  return (
    <div className="pl-0 pr-8 mb-0 mt-6">
      <a
        href="https://www.sti.edu/newsarticledetail1.asp?i=NTE4&p=c3RpX3N0dWRlbnRzX2Nvb2tfdXBfc3VjY2Vzc19hdF9qbWxfZmxhdm9yX2Zlc3RpdmFs"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/strongxsti.png"
          alt="Scholarship Banner"
          className="w-[850px] h-[180px] rounded-lg object-cover"
          style={{ objectPosition: "center 90%" }}
        />
      </a>
    </div>
  );
}

// DashboardCards Component
function DashboardCards() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-[850px]">
      <DashboardCard
        icon={<FileText className="w-6 h-6 text-blue-600" />}
        label={
          <>
            <span>Submit</span>
            <br />
            <span>Application</span>
          </>
        }
        active={true}
        size={{ width: "200px", height: "170px" }}
        onClick={() => navigate("/student/studentrequirementmanagement")}
        bgColor="#CFEAFF"
        textColor="#0376C0"
        chevronColor="blue"
      />
      <DashboardCard
        icon={<BookOpenCheck className="w-6 h-6 text-blue-600" />}
        label={
          <>
            <span>Take</span>
            <br />
            <span>Examination</span>
          </>
        }
        active={false}
        size={{ width: "200px", height: "170px" }}
        onClick={() => navigate("/student/studenttechnicalassessmentoverview")}
        bgColor="#A8D6FF"
        textColor="#0376C0"
        chevronColor="blue"
      />
      <DashboardCard
        icon={<Calendar className="w-6 h-6 text-blue-600" />}
        label={
          <>
            <span>Schedule</span>
            <br />
            <span>Interview</span>
          </>
        }
        active={false}
        size={{ width: "200px", height: "170px" }}
        onClick={() => navigate("/interview-management")}
        bgColor="#74B9FF"
        textColor="#FFF6F6"
        chevronColor="white"
      />
      <DashboardCard
        icon={<Pencil className="w-6 h-6 text-blue-600" />}
        label={
          <>
            <span>Sign</span>
            <br />
            <span>Contract</span>
          </>
        }
        active={false}
        size={{ width: "200px", height: "170px" }}
        onClick={() => navigate("/technical-assessment")}
        bgColor="#3E89FF"
        textColor="#FFFFFF"
        chevronColor="white"
      />
    </div>
  );
}

// DashboardCard Component
function DashboardCard({
  icon,
  label,
  active,
  size,
  onClick,
  bgColor,
  textColor,
  chevronColor,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
  active: boolean;
  size?: { width: string; height: string };
  onClick?: () => void;
  bgColor: string;
  textColor: string;
  chevronColor: string;
}) {
  return (
    <div
      className={`p-5 rounded-2xl flex flex-col items-start transition-all cursor-pointer`}
      style={{
        width: size?.width,
        height: size?.height,
        backgroundColor: bgColor,
        color: textColor,
      }}
      onClick={onClick}
    >
      <div className="flex justify-left w-full">
        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white">
          {icon}
        </div>
      </div>

      <div className="flex items-center justify-between w-full mt-auto">
        <h2 className="text-md font-semibold">{label}</h2>
        <ChevronRight
          className={`w-5 h-5 ${active ? "text-blue-600" : chevronColor}`}
        />
      </div>
    </div>
  );
}

// InfoSections Component
function InfoSections() {
  return (
    <div className="max-w-[850px] h-[80px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ml-5 ">
      <InfoCard
        title="To-Do List:"
        items={[
          "Submit Missing Documents — Upload your Birth Certificate before June 20, 2025.",
          "Schedule Your Interview — Slots are filling up fast! Choose a date for your interview.",
        ]}
      />
      <InfoCard
        title="Notifications"
        items={[
          "A new update has been posted regarding the interview guidelines. Click here to read more.",
          "Your submitted documents are currently being reviewed.",
          "Congratulations! Your application has been approved. Next step: Technical Assessment.",
        ]}
      />
    </div>
  );
}

// InfoCard Component
function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="p-3 border-2 border-blue-400 rounded-lg h-auto">
      <h2 className="text-base font-semibold text-blue-600 mb-2">{title}</h2>
      <ul className="space-y-1 text-gray-600 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-2 mt-1.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// StatusTracker Component
function StatusTracker({
  progress,
  steps,
  stepSpacing = "mb-4",
}: {
  progress: number;
  steps: string[];
  stepSpacing?: string;
}) {
  return (
    <div className="absolute top-0 right-20 mt-0">
      <div className="mb-4 p-3 bg-white rounded-2xl border-2 border-gray-200 w-[250px]">
        <h2 className="text-sm font-medium text-gray-400">
          Deadline of Submissions:
        </h2>
        <p className="text-lg font-bold text-blue-600">June 20, 2025</p>
      </div>

      <div className="bg-white rounded-2xl border-3 border-gray-200 p-6 w-[250px] h-[480px]">
        <h2 className="text-base font-medium text-gray-400 mb-6">
          Status Tracker:
        </h2>

        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 relative">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#007bff"
                strokeWidth="8"
                fill="none"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (progress / 100) * 251.2}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-blue-600 font-bold text-xl">
              {progress}%
            </div>
          </div>
        </div>

        <ul>
          {steps.map((step, index) => (
            <li
              key={index}
              className={`flex items-center text-gray-400 mb-6 ${stepSpacing}`}
            >
              <span
                className={`w-4 h-4 rounded-full mr-4 shrink-0 ${
                  index === 0
                    ? "bg-green-300"
                    : index === 1
                    ? "bg-yellow-300"
                    : "bg-gray-300"
                }`}
              />
              <span className="text-sm font-normal">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudentDashboard;
