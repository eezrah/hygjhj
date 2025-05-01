import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  ChevronDown,
  LogOut,
  ChevronRight,
  /* Commented out for future use:
  CheckCircle,
  XCircle,
  ClipboardList,
  User,
  */
} from "lucide-react";
import axios from "axios";

interface Student {
  full_name: string;
  student_id: number;
  campus: string;
  current_status: string;
}

interface StatCardProps {
  label: string;
  count: number;
  status?: "pendingApproval" | "pendingRequirements" | "accepted" | "denied";
  isLoading?: boolean;
}

interface StatusCardProps {
  count: string;
  label: string;
  fullWidth?: boolean;
  heightClass?: string; // Added heightClass to allow dynamic height
}

// Dashboard Component
function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [counts, setCounts] = useState({
    pendingApproval: 0,
    pendingRequirements: 0,
    accepted: 0,
    denied: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchCounts = async () => {
    try {
      const response = await axios.get<{ students: Student[] }>(
        "http://localhost:6001/api/metrobank/students",
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );
      if (response.data && Array.isArray(response.data.students)) {
        const counts = {
          pendingApproval: response.data.students.filter(
            (student: Student) =>
              student.current_status.toLowerCase() === "pending approval"
          ).length,
          pendingRequirements: response.data.students.filter(
            (student: Student) =>
              student.current_status.toLowerCase() === "pending requirements"
          ).length,
          accepted: response.data.students.filter(
            (student: Student) =>
              student.current_status.toLowerCase() === "accepted"
          ).length,
          denied: response.data.students.filter(
            (student: Student) =>
              student.current_status.toLowerCase() === "denied"
          ).length,
        };
        setCounts(counts);
      }
    } catch (error) {
      console.error("Error fetching counts:", error);
      setCounts({
        pendingApproval: 0,
        pendingRequirements: 0,
        accepted: 0,
        denied: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF]">
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8 border-b border-[#024FA8]/20 pb-6">
          <div>
            <p className="text-sm text-[#64748B] pl-2">
              Hello, Metrobank Admin!
            </p>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#024FA8] to-[#0369A1] bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          <div className="relative">
            <button
              className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all border border-[#024FA8]/10"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              <div className="text-right">
                <p className="text-sm font-semibold text-[#024FA8]">
                  Metrobank Admin 1
                </p>
              </div>
              <ChevronDown className="w-5 h-5 text-[#024FA8]" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-2 z-10 border border-[#024FA8]/10">
                <button className="flex items-center w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-[#F0F7FF] hover:to-[#E0F2FE] text-[#024FA8] text-sm rounded-lg transition-all">
                  <LogOut className="w-4 h-4 mr-3" /> Log Out
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-5">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-[#024FA8] to-[#0369A1] bg-clip-text text-transparent mb-6">
            Applicants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Pending Approval"
              count={counts.pendingApproval}
              status="pendingApproval"
              isLoading={isLoading}
            />
            <StatCard
              label="Pending Requirements"
              count={counts.pendingRequirements}
              status="pendingRequirements"
              isLoading={isLoading}
            />
            <StatCard
              label="Accepted"
              count={counts.accepted}
              status="accepted"
              isLoading={isLoading}
            />
            <StatCard
              label="Denied"
              count={counts.denied}
              status="denied"
              isLoading={isLoading}
            />
          </div>

          <section className="mt-10">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-[#024FA8] to-[#0369A1] bg-clip-text text-transparent mb-6">
              Selection Status
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#024FA8]/10 shadow-sm">
                <h3 className="text-[#024FA8] font-semibold mb-4">Examinees</h3>
                <div className="grid grid-cols-2 gap-4">
                  <StatusCard
                    count="0"
                    label="To be Scheduled"
                    heightClass="h-33"
                  />
                  <StatusCard count="0" label="Scheduled" heightClass="h-33" />
                  <StatusCard
                    count="0"
                    label="In Progress"
                    heightClass="h-33"
                  />
                  <StatusCard
                    count="0"
                    label="Waiting for Scores"
                    heightClass="h-33"
                  />
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#024FA8]/10 shadow-sm">
                <h3 className="text-[#024FA8] font-semibold mb-4">
                  Interviewees
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <StatusCard
                    count="0"
                    label="Scheduling"
                    fullWidth
                    heightClass="h-70"
                  />
                  <StatusCard
                    count="0"
                    label="In Progress"
                    fullWidth
                    heightClass="h-70"
                  />
                  <StatusCard
                    count="0"
                    label="Finished"
                    fullWidth
                    heightClass="h-70"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Updated StatCard Component
const StatCard = ({ label, count, status, isLoading }: StatCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Map the status to match the filter options in Admin page
    const statusMap = {
      pendingApproval: "Pending Approval",
      pendingRequirements: "Pending Requirements",
      accepted: "Accepted",
      denied: "Denied",
    };

    const mappedStatus = status ? statusMap[status] : "All";
    navigate(`/admin?status=${encodeURIComponent(mappedStatus)}`);
  };

  const styles = {
    pendingApproval:
      "bg-gradient-to-r from-[#FFF6E5] to-[#FFF0D9] border border-[#024FA8]/20",
    pendingRequirements:
      "bg-gradient-to-r from-[#FFF8E1] to-[#FFF3D0] border border-[#024FA8]/20",
    accepted:
      "bg-gradient-to-r from-[#E8F5E9] to-[#D5ECD6] border border-[#024FA8]/20",
    denied:
      "bg-gradient-to-r from-[#FFEBEE] to-[#FFE0E3] border border-[#024FA8]/20",
  };

  const iconStyles = {
    pendingApproval:
      "bg-gradient-to-r from-[#FFE0B2] to-[#FFD699] text-[#024FA8]",
    pendingRequirements:
      "bg-gradient-to-r from-[#FFF59D] to-[#FFF176] text-[#024FA8]",
    accepted: "bg-gradient-to-r from-[#A5D6A7] to-[#81C784] text-[#024FA8]",
    denied: "bg-gradient-to-r from-[#EF9A9A] to-[#E57373] text-[#024FA8]",
  };

  return (
    <button
      onClick={handleClick}
      className={`relative flex flex-col justify-between w-full p-6 rounded-xl transition-all duration-200 ${
        styles[status ?? "pendingApproval"]
      } hover:shadow-lg hover:scale-102 ${
        isLoading ? "opacity-70" : ""
      } backdrop-blur-sm`}
      disabled={isLoading}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full shadow-sm ${
            iconStyles[status ?? "pendingApproval"]
          }`}
        >
          <FileText size={20} />
        </div>
        <span className="text-[#024FA8] font-medium">{label}</span>
      </div>

      <div className="flex justify-between items-center mt-3">
        {isLoading ? (
          <div className="flex items-center ml-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#024FA8]"></div>
          </div>
        ) : (
          <span className="text-[#024FA8] text-2xl font-bold ml-2">
            {count}
          </span>
        )}
        <ChevronRight size={20} className="text-[#024FA8] opacity-70" />
      </div>
    </button>
  );
};

const StatusCard = ({
  count,
  label,
  fullWidth,
  heightClass,
}: StatusCardProps & { heightClass?: string }) => {
  const getGradient = (label: string) => {
    switch (label) {
      case "To be Scheduled":
        return "bg-gradient-to-r from-[#E3F2FD] to-[#BBDEFB]";
      case "Scheduled":
        return "bg-gradient-to-r from-[#B3E5FC] to-[#81D4FA]";
      case "In Progress":
        return "bg-gradient-to-r from-[#FFECB3] to-[#FFE082]";
      case "Waiting for Scores":
        return "bg-gradient-to-r from-[#FFE0B2] to-[#FFCC80]";
      case "Scheduling":
        return "bg-gradient-to-r from-[#C8E6C9] to-[#A5D6A7]";
      case "Finished":
        return "bg-gradient-to-r from-[#C8E6C9] to-[#81C784]";
      default:
        return "bg-gradient-to-r from-[#F5F5F5] to-[#E0E0E0]";
    }
  };

  return (
    <div
      className={`px-6 py-4 border border-[#024FA8]/10 flex justify-between items-center shadow-sm hover:shadow-md transition-all rounded-xl backdrop-blur-sm ${
        fullWidth ? "w-full" : "w-auto"
      } ${heightClass} ${getGradient(label)}`}
    >
      <div className="flex flex-col">
        <span className="text-[#024FA8] font-bold text-lg">{count}</span>
        <span className="text-[#024FA8]/80 text-sm">{label}</span>
      </div>
      <ChevronRight size={18} className="text-[#024FA8] opacity-70" />
    </div>
  );
};

export default Dashboard;
