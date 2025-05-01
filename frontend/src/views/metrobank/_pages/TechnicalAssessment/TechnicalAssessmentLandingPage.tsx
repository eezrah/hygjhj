import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  Settings,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Student {
  full_name: string;
  student_id: number;
  campus: string;
  current_status: string;
  score: number | "N/A";
}

type AssessmentStatus = "Missing" | "Passed" | "Failed" | "All";

interface HeaderProps {
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
}

function Header({ dropdownOpen, setDropdownOpen }: HeaderProps) {
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-[#024FA8]/10 relative">
      <div className="flex justify-between items-center px-10 py-6">
        {/* Back Button */}
        <div
          className="flex items-center space-x-4 group cursor-pointer"
          onClick={() => navigate("/metrobank/admindashboard")}
        >
          <div className="bg-gradient-to-r from-[#024FA8] to-[#0369A1] rounded-full p-2 group-hover:from-[#023d82] group-hover:to-[#025785] transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#024FA8] to-[#0369A1] bg-clip-text text-transparent">
            Technical Assessment Results
          </h1>
        </div>

        {/* Admin Dropdown */}
        <div className="relative">
          <button
            ref={buttonRef}
            className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all border border-[#024FA8]/10"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
          >
            <div className="text-right">
              <p className="text-sm font-semibold text-[#024FA8]">
                Metrobank Admin 1
              </p>
              <p className="text-xs text-[#64748B]">HR Department</p>
            </div>
            <img
              src="/vaunia.png"
              alt="Admin Profile"
              className="w-10 h-10 rounded-full border-2 border-[#024FA8]/20"
            />
            <ChevronDown
              className={`w-4 h-4 text-[#024FA8] transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function AssessmentTable() {
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState<Student[]>([]);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [counts, setCounts] = useState({
      missing: 0,
      passed: 0,
      failed: 0,
    });
  
    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Show 5 students per page
  
    const dropdownRef = useRef<HTMLDivElement>(null);
    const datepickerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
  
    // Dummy data
    const dummyStudents: Student[] = [
      {
        full_name: "Aguilar, Dann Ashley X.",
        student_id: 2000123456,
        campus: "STI Ortigas-Cainta",
        current_status: "Missing",
        score: "N/A"
      },
      {
        full_name: "Asuncion, Jaime V.",
        student_id: 2000123456,
        campus: "STI Binangonan",
        current_status: "Passed",
        score: 90
      },
      {
        full_name: "Caneso, Jericho H.",
        student_id: 2000123456,
        campus: "STI Mindanao",
        current_status: "Failed",
        score: 20
      },
      {
          full_name: "Caneso, Jericho H.",
          student_id: 2000123456,
          campus: "STI Mindanao",
          current_status: "Failed",
          score: 20
        },
        {
          full_name: "Caneso, Jericho H.",
          student_id: 2000123456,
          campus: "STI Mindanao",
          current_status: "Failed",
          score: 20
        }
    ];
  
    useEffect(() => {
      // Simulate API call with dummy data
      setTimeout(() => {
        setStudents(dummyStudents);
        setFilteredStudents(dummyStudents);
        
        // Calculate counts
        const newCounts = {
          missing: dummyStudents.filter(s => s.current_status === "Missing").length,
          passed: dummyStudents.filter(s => s.current_status === "Passed").length,
          failed: dummyStudents.filter(s => s.current_status === "Failed").length,
        };
        setCounts(newCounts);
        setIsLoading(false);
      }, 1000);
    }, []);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setFilterDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [dropdownRef]);
  
    const handleFilter = (status: AssessmentStatus) => {
      let newFilteredList = [];
      if (status === "All" || status === activeFilter) {
        newFilteredList = students;
        navigate(location.pathname, { replace: true });
        setActiveFilter("");
      } else {
        newFilteredList = students.filter(
          (student) => student.current_status === status
        );
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("status", status);
        navigate(`${location.pathname}?${searchParams.toString()}`, {
          replace: true,
        });
        setActiveFilter(status);
      }
      setFilteredStudents(newFilteredList);
      setCurrentPage(1);
      setFilterDropdownOpen(false);
    };
  
    const getStatusColor = (status: string): string => {
      switch (status) {
        case "Missing":
          return "bg-gray-400";
        case "Passed":
          return "bg-green-400";
        case "Failed":
          return "bg-red-400";
        default:
          return "bg-gray-500";
      }
    };
  
    // --- Pagination Logic ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTableData = Array.isArray(filteredStudents)
      ? filteredStudents.slice(indexOfFirstItem, indexOfLastItem)
      : [];
    const totalPages = Array.isArray(filteredStudents)
      ? Math.ceil(filteredStudents.length / itemsPerPage)
      : 0;
  
    const goToNextPage = () => {
      setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    };
  
    const goToPreviousPage = () => {
      setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    };
  
    const handleRowClick = (studentId: number) => {
      // Temporarily disabled navigation until backend is ready
      // navigate(`/metrobank/assessment/${studentId}`);
      alert("Student details page is under construction");
    };
  
    return (
      <div className="flex-1 mx-8 mt-6 mb-8 flex flex-col bg-white/80 backdrop-blur-sm shadow-sm border border-[#024FA8]/10 rounded-xl">
        <div className="flex justify-between items-center px-8 py-4 border-b border-[#024FA8]/10">
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#024FA8] to-[#0369A1] bg-clip-text text-transparent">
            Assessment Results
          </h2>
  
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button
                onClick={() => handleFilter("Missing")}
                className={`px-4 py-2 rounded-xl border border-[#024FA8]/20 text-sm transition-all flex items-center space-x-2 ${
                  activeFilter === "Missing"
                    ? "bg-[#024FA8] text-white"
                    : "bg-white text-[#024FA8] hover:bg-[#024FA8] hover:text-white"
                }`}
              >
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                <span>{counts.missing} Missing</span>
              </button>
              <button
                onClick={() => handleFilter("Passed")}
                className={`px-4 py-2 rounded-xl border border-[#024FA8]/20 text-sm transition-all flex items-center space-x-2 ${
                  activeFilter === "Passed"
                    ? "bg-[#024FA8] text-white"
                    : "bg-white text-[#024FA8] hover:bg-[#024FA8] hover:text-white"
                }`}
              >
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400"></span>
                <span>{counts.passed} Passed</span>
              </button>
              <button
                onClick={() => handleFilter("Failed")}
                className={`px-4 py-2 rounded-xl border border-[#024FA8]/20 text-sm transition-all flex items-center space-x-2 ${
                  activeFilter === "Failed"
                    ? "bg-[#024FA8] text-white"
                    : "bg-white text-[#024FA8] hover:bg-[#024FA8] hover:text-white"
                }`}
              >
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span>{counts.failed} Failed</span>
              </button>
            </div>
  
            <div className="relative" ref={dropdownRef}>
              <button
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-[#024FA8] text-sm ${
                  filterDropdownOpen
                    ? "bg-[#F0F7FF] border border-[#024FA8]/20"
                    : "hover:bg-[#F0F7FF] border border-[#024FA8]/10"
                } transition-all`}
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
              >
                <Settings size={20} strokeWidth={1.5} />
                <span>Filter By</span>
              </button>
              {filterDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-2 z-50 border border-[#024FA8]/10">
                  <button
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-[#F0F7FF] text-[#024FA8] text-sm rounded-lg transition-all"
                    onClick={() => handleFilter("Missing")}
                  >
                    <span className="inline-block w-3 h-3 rounded-full mr-2 bg-gray-400"></span>
                    Missing
                  </button>
                  <button
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-[#F0F7FF] text-[#024FA8] text-sm rounded-lg transition-all"
                    onClick={() => handleFilter("Passed")}
                  >
                    <span className="inline-block w-3 h-3 rounded-full mr-2 bg-green-400"></span>
                    Passed
                  </button>
                  <button
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-[#F0F7FF] text-[#024FA8] text-sm rounded-lg transition-all"
                    onClick={() => handleFilter("Failed")}
                  >
                    <span className="inline-block w-3 h-3 rounded-full mr-2 bg-red-400"></span>
                    Failed
                  </button>
                  <button
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-[#F0F7FF] text-[#024FA8] text-sm rounded-lg transition-all"
                    onClick={() => handleFilter("All")}
                  >
                    <span className="inline-block w-3 h-3 rounded-full mr-2 bg-[#024FA8]"></span>
                    All
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
  
        <div className="flex-1 flex flex-col px-8 pt-4 pb-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[300px]">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-[#E0F2FE] rounded-full"></div>
                <div className="w-16 h-16 border-4 border-[#024FA8] rounded-full border-t-transparent absolute top-0 left-0 animate-spin"></div>
              </div>
              <p className="mt-4 text-[#64748B] text-sm">Loading results...</p>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="rounded-xl border border-[#024FA8]/10 flex-grow">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#024FA8] to-[#0369A1] text-white text-sm">
                    <tr>
                      <th className="w-16 px-6 py-3 text-left font-medium">
                        Profile
                      </th>
                      <th className="w-1/4 px-6 py-3 text-left font-medium">
                        Name
                      </th>
                      <th className="w-1/4 px-6 py-3 text-left font-medium">
                        Student ID
                      </th>
                      <th className="w-1/4 px-6 py-3 text-left font-medium">
                        STI Branch
                      </th>
                      <th className="w-1/6 px-6 py-3 text-left font-medium">
                        Status
                      </th>
                      <th className="w-1/6 px-6 py-3 text-left font-medium">
                        Scores
                      </th>
                    </tr>
                  </thead>
  
                  <tbody className="bg-white/50 divide-y divide-[#024FA8]/10">
                    {currentTableData.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-8 text-[#64748B]"
                        >
                          No assessment results match the current filter.
                        </td>
                      </tr>
                    ) : (
                      currentTableData.map((student) => (
                        <tr
                          key={student.student_id}
                          onClick={() => handleRowClick(student.student_id)}
                          className="hover:bg-[#F0F7FF] transition-colors cursor-pointer group"
                        >
                          <td className="px-6 py-3">
                            <img
                              src="/vaunia.png"
                              alt="Student Profile"
                              className="rounded-full w-8 h-8 border-2 border-[#024FA8]/20 group-hover:border-[#024FA8]/40 transition-all"
                            />
                          </td>
                          <td className="px-6 py-3 text-[#334155] text-sm font-medium group-hover:text-[#024FA8] transition-colors">
                            {student.full_name}
                          </td>
                          <td className="px-6 py-3 text-[#64748B] text-sm group-hover:text-[#024FA8]/80 transition-colors">
                            {student.student_id}
                          </td>
                          <td className="px-6 py-3 text-[#64748B] text-sm group-hover:text-[#024FA8]/80 transition-colors">
                            {student.campus}
                          </td>
                          <td className="px-6 py-3">
                            <div className="flex items-center space-x-2">
                              <span
                                className={`w-2.5 h-2.5 rounded-full ${getStatusColor(
                                  student.current_status
                                )}`}
                              ></span>
                              <span className="text-[#64748B] text-sm group-hover:text-[#024FA8]/80 transition-colors">
                                {student.current_status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-[#64748B] text-sm group-hover:text-[#024FA8]/80 transition-colors">
                            {student.score}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
  
              {!isLoading && filteredStudents.length > 0 && (
                <div className="flex justify-between items-center pt-2 pb-0 mt-auto">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="flex items-center px-4 py-2 text-sm font-medium text-[#024FA8] bg-white border border-[#024FA8]/20 rounded-lg hover:bg-[#F0F7FF] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </button>
                  <span className="text-sm text-[#64748B]">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-4 py-2 text-sm font-medium text-[#024FA8] bg-white border border-[#024FA8]/20 rounded-lg hover:bg-[#F0F7FF] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

function TechnicalAssessmentLandingPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF]">
      <main className="flex-1 flex flex-col h-screen">
        <Header dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
        <AssessmentTable />
      </main>
    </div>
  );
}

export default TechnicalAssessmentLandingPage;
