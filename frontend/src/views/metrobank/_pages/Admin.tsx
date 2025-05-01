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

import axios from "axios";
import { createPortal } from "react-dom";

interface Student {
  full_name: string;
  student_id: number;
  campus: string;
  current_status: string;
}

type ApplicationStatus =
  | "Pending Approval"
  | "Pending Requirements"
  | "Accepted"
  | "Denied"
  | "All";

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
            Application Requirements
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
          {dropdownOpen &&
            buttonRef.current &&
            createPortal(
              <div
                style={{
                  position: "fixed",
                  top: `${
                    buttonRef.current.getBoundingClientRect().bottom + 8
                  }px`,
                  left: `${
                    buttonRef.current.getBoundingClientRect().right - 192
                  }px`,
                  zIndex: 999999,
                }}
                className="w-48 bg-white shadow-2xl rounded-xl p-2 border border-[#024FA8]/10"
              >
                <button
                  className="flex items-center w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-[#F0F7FF] hover:to-[#E0F2FE] text-[#024FA8] text-sm rounded-lg transition-all group"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <LogOut className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1" />
                  Log Out
                </button>
              </div>,
              document.body
            )}
        </div>
      </div>
    </div>
  );
}

function StudentTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [counts, setCounts] = useState({
    pendingApproval: 0,
    pendingRequirements: 0,
    accepted: 0,
    denied: 0,
  });

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Show 5 students per page

  const dropdownRef = useRef<HTMLDivElement>(null);
  const datepickerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Initialize activeFilter from URL parameters or reset if on /admin
  useEffect(() => {
    if (location.pathname === "/admin" && !location.search) {
      setActiveFilter("");
      setFilteredStudents(students);
    } else {
      const queryParams = new URLSearchParams(location.search);
      const status = queryParams.get("status");
      if (status) {
        setActiveFilter(decodeURIComponent(status));
      }
    }
  }, [location, students]);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      setStudents([]);
      setFilteredStudents([]);
      setError(null);
      try {
        const response = await axios.get<{
          total: number;
          students: Student[];
        }>("http://localhost:6001/api/metrobank/students");
        if (response.data && response.data.students) {
          setStudents(response.data.students);
          setFilteredStudents(response.data.students);

          // Calculate counts from the fetched students
          const newCounts = {
            pendingApproval: response.data.students.filter(
              (student) =>
                student.current_status.toLowerCase() === "pending approval"
            ).length,
            pendingRequirements: response.data.students.filter(
              (student) =>
                student.current_status.toLowerCase() === "pending requirements"
            ).length,
            accepted: response.data.students.filter(
              (student) => student.current_status.toLowerCase() === "accepted"
            ).length,
            denied: response.data.students.filter(
              (student) => student.current_status.toLowerCase() === "denied"
            ).length,
          };
          setCounts(newCounts);
          setCurrentPage(1);
        } else {
          setError("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to fetch student data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFilterDropdownOpen(false);
      }
      if (
        datepickerRef.current &&
        !datepickerRef.current.contains(event.target as Node)
      ) {
        setShowDatepicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, datepickerRef]);

  const handleFilter = (status: ApplicationStatus) => {
    let newFilteredList = [];
    if (status === "All" || status === activeFilter) {
      newFilteredList = students;
      navigate(location.pathname, { replace: true });
      setActiveFilter("");
    } else {
      newFilteredList = students.filter((student) => {
        const normalizedStudentStatus = student.current_status
          .trim()
          .toLowerCase();
        const normalizedFilterStatus = status.toLowerCase();
        return normalizedStudentStatus === normalizedFilterStatus;
      });

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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");

    if (!students.length) return; // Don't filter if no students loaded yet

    let newFilteredList = [];
    if (status && status !== "All") {
      newFilteredList = students.filter((student) => {
        const normalizedStudentStatus = student.current_status
          .trim()
          .toLowerCase();
        const normalizedFilterStatus = decodeURIComponent(status)
          .trim()
          .toLowerCase();
        return normalizedStudentStatus === normalizedFilterStatus;
      });
    } else {
      newFilteredList = students;
    }
    setFilteredStudents(newFilteredList);
    setCurrentPage(1);
  }, [location.search, students]);

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Ensure filteredStudents is an array before slicing
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

  const getStatusColor = (status: string): string => {
    const normalizedStatus = status.trim().toLowerCase();

    switch (normalizedStatus) {
      case "pending approval":
        return "bg-orange-400";
      case "pending requirements":
        return "bg-yellow-400";
      case "accepted":
        return "bg-green-400";
      case "denied":
        return "bg-red-400";
      default:
        return "bg-gray-500";
    }
  };

  const handleDateSelect = (day: number) => {
    setDeadline(`${months[currentMonth]} ${day}, ${currentYear}`);
    setShowDatepicker(false);
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    const days: React.ReactNode[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-xs h-7 w-7"></div>);
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === 18 && currentMonth === 2 && currentYear === 2026;
      days.push(
        <button
          key={i}
          className={`text-xs rounded-full h-7 w-7 flex items-center justify-center hover:bg-blue-100 ${
            isToday ? "bg-blue-500 text-white" : "text-gray-700"
          }`}
          onClick={() => handleDateSelect(i)}
        >
          {i}
        </button>
      );
    }

    return days;
  };

  const handleRowClick = (studentId: number) => {
    navigate(`/metrobank/applicantform/${studentId}`);
  };

  return (
    <div className="flex-1 mx-8 mt-6 mb-8 flex flex-col bg-white/80 backdrop-blur-sm shadow-sm border border-[#024FA8]/10 rounded-xl">
      <div className="flex justify-between items-center px-8 py-4 border-b border-[#024FA8]/10">
        <h2 className="text-xl font-bold bg-gradient-to-r from-[#024FA8] to-[#0369A1] bg-clip-text text-transparent">
          List of Applicants
        </h2>

        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={() => handleFilter("Pending Approval")}
              className={`px-4 py-2 rounded-xl border border-[#024FA8]/20 text-sm transition-all flex items-center space-x-2 ${
                activeFilter && activeFilter === "Pending Approval"
                  ? "bg-[#024FA8] text-white"
                  : "bg-white text-[#024FA8] hover:bg-[#024FA8] hover:text-white"
              }`}
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-400"></span>
              <span>{counts.pendingApproval} Pending Approval</span>
            </button>
            <button
              onClick={() => handleFilter("Pending Requirements")}
              className={`px-4 py-2 rounded-xl border border-[#024FA8]/20 text-sm transition-all flex items-center space-x-2 ${
                activeFilter && activeFilter === "Pending Requirements"
                  ? "bg-[#024FA8] text-white"
                  : "bg-white text-[#024FA8] hover:bg-[#024FA8] hover:text-white"
              }`}
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
              <span>{counts.pendingRequirements} Pending Requirements</span>
            </button>
            <button
              onClick={() => handleFilter("Accepted")}
              className={`px-4 py-2 rounded-xl border border-[#024FA8]/20 text-sm transition-all flex items-center space-x-2 ${
                activeFilter && activeFilter === "Accepted"
                  ? "bg-[#024FA8] text-white"
                  : "bg-white text-[#024FA8] hover:bg-[#024FA8] hover:text-white"
              }`}
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400"></span>
              <span>{counts.accepted} Accepted</span>
            </button>
            <button
              onClick={() => handleFilter("Denied")}
              className={`px-4 py-2 rounded-xl border border-[#024FA8]/20 text-sm transition-all flex items-center space-x-2 ${
                activeFilter && activeFilter === "Denied"
                  ? "bg-[#024FA8] text-white"
                  : "bg-white text-[#024FA8] hover:bg-[#024FA8] hover:text-white"
              }`}
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span>{counts.denied} Denied</span>
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
                  onClick={() => handleFilter("Pending Approval")}
                >
                  <span className="inline-block w-3 h-3 rounded-full mr-2 bg-[#F97316]"></span>
                  Pending Approval
                </button>
                <button
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-[#F0F7FF] text-[#024FA8] text-sm rounded-lg transition-all"
                  onClick={() => handleFilter("Pending Requirements")}
                >
                  <span className="inline-block w-3 h-3 rounded-full mr-2 bg-[#FBBF24]"></span>
                  Pending Requirements
                </button>
                <button
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-[#F0F7FF] text-[#024FA8] text-sm rounded-lg transition-all"
                  onClick={() => handleFilter("Accepted")}
                >
                  <span className="inline-block w-3 h-3 rounded-full mr-2 bg-[#22C55E]"></span>
                  Accepted
                </button>
                <button
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-[#F0F7FF] text-[#024FA8] text-sm rounded-lg transition-all"
                  onClick={() => handleFilter("Denied")}
                >
                  <span className="inline-block w-3 h-3 rounded-full mr-2 bg-[#EF4444]"></span>
                  Denied
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

          {/* Date Picker */}
          <div className="relative" ref={datepickerRef}>
            <div className="bg-white/80 backdrop-blur-sm border border-[#024FA8]/20 rounded-xl flex items-center overflow-hidden">
              <div className="px-4 py-2 text-sm">
                <span className="text-[#64748B]">Set Deadline:</span>
                <div className="text-[#024FA8] font-medium">{deadline}</div>
              </div>
              <button
                className="p-2 bg-[#F0F7FF] hover:bg-[#E0F2FE] transition-all"
                onClick={() => setShowDatepicker(!showDatepicker)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#024FA8]"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </button>
            </div>

            {showDatepicker && (
              <div className="absolute right-0 mt-2 w-72 bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-4 z-50 border border-[#024FA8]/10">
                <div className="flex justify-between items-center mb-4 bg-[#F0F7FF] p-3 rounded-xl">
                  <button
                    onClick={handlePrevMonth}
                    className="text-[#024FA8] hover:bg-[#E0F2FE] rounded-full p-1.5 transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div className="flex space-x-2">
                    <select
                      value={currentMonth}
                      onChange={(e) =>
                        setCurrentMonth(parseInt(e.target.value))
                      }
                      className="bg-white border border-[#024FA8]/20 rounded-lg px-2 py-1 text-sm text-[#024FA8]"
                    >
                      {months.map((month, idx) => (
                        <option key={month} value={idx}>
                          {month}
                        </option>
                      ))}
                    </select>

                    <select
                      value={currentYear}
                      onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                      className="bg-white border border-[#024FA8]/20 rounded-lg px-2 py-1 text-sm text-[#024FA8]"
                    >
                      {Array.from(
                        { length: 10 },
                        (_, i) => currentYear - 5 + i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleNextMonth}
                    className="text-[#024FA8] hover:bg-[#E0F2FE] rounded-full p-1.5 transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="bg-[#F0F7FF] p-3 rounded-xl mb-4">
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                      <div
                        key={i}
                        className="text-xs text-[#64748B] font-medium"
                      >
                        {day}
                      </div>
                    ))}
                    {renderCalendar()}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-[#024FA8] to-[#0369A1] text-white rounded-lg text-sm hover:from-[#023d82] hover:to-[#025785] transition-all shadow-sm"
                    onClick={() => setShowDatepicker(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-center py-3 px-8 border-b border-[#024FA8]/10">
          {error}
        </div>
      )}

      <div className="flex-1 px-8 py-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[300px]">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#E0F2FE] rounded-full"></div>
              <div className="w-16 h-16 border-4 border-[#024FA8] rounded-full border-t-transparent absolute top-0 left-0 animate-spin"></div>
            </div>
            <p className="mt-4 text-[#64748B] text-sm">Loading students...</p>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="rounded-xl border border-[#024FA8]/10">
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
                  </tr>
                </thead>

                <tbody className="bg-white/50 divide-y divide-[#024FA8]/10">
                  {currentTableData.length === 0 && !error && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-8 text-[#64748B]"
                      >
                        No students match the current filter.
                      </td>
                    </tr>
                  )}
                  {currentTableData.map((student) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!isLoading && filteredStudents.length > 0 && (
              <div className="flex justify-between items-center pt-4">
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

function Admin() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF]">
      <main className="flex-1 flex flex-col h-screen">
        <StudentTable />
      </main>
    </div>
  );
}

export default Admin;
