import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Download,
  Fullscreen,
  ChevronDown,
  UserPen,
  LogOut,
} from "lucide-react";

// Ensure the path is correct
import axios, { AxiosError } from "axios"; // Added axios and AxiosError

// Define types for props
interface HeaderProps {
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
}

interface ConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: string;
}

interface DocumentRowProps {
  title: string;
  filename: string;
}

// Interface for detailed student data (adjust as needed based on API response)
interface StudentProfileData {
  s_full_name: string;
  student_id: number;
  s_campus: string;
  applicationstatus: string;
  // Add other fields if your API returns more details, e.g., documents
  // documents?: { title: string; filename: string }[];
}

// Header component for the navigation bar
function Header({ dropdownOpen, setDropdownOpen }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center mb-2 px-10">
        {/* Back Button - Navigate back to the student list */}
        <button
          onClick={() => navigate("/metrobank/admin")} // Go back to the list page
          className="flex items-center text-custom-blue font-bold text-2xl"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Application Requirement
        </button>

        {/* Admin Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
          >
            <div className="text-right">
              <p className="text-sm font-medium text-custom-gray">
                Metrobank Admin 1
              </p>
              <p className="text-xs text-custom-gray">HR Department</p>
            </div>
            <img
              src="/vaunia.png"
              alt="Admin Profile"
              className="w-10 h-10 rounded-full"
            />
            <ChevronDown className="w-4 h-4" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md p-2 z-10">
              {/* Kept original dropdown items */}
              <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200 text-custom-gray text-sm">
                <UserPen className="w-4 h-4 mr-2" /> Edit Photo
              </button>
              <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200 text-custom-gray text-sm">
                <LogOut className="w-4 h-4 mr-2" /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Adjusted Line */}
      <hr className="border-t border-custom-gray w-[calc(100%-5rem)] mx-10" />
    </div>
  );
}

// Modal component for confirmation
function ConfirmationModal({
  show,
  onClose,
  onConfirm,
  action,
}: ConfirmationModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md p-6 w-96 border-2 border-blue-500">
        <h2 className="text-lg font-semibold text-custom-blue mb-4">
          Confirm {action}
        </h2>
        <p className="mb-4 text-gray-700">
          Are you sure you want to {action.toLowerCase()} this submission?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// Main component for the Applicant Profile page
function ApplicantProfile() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const { studentId } = useParams<{ studentId: string }>(); // Get studentId from URL

  // State for student data, loading, and error
  const [studentData, setStudentData] = useState<StudentProfileData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get status color (copied from Admin.tsx for consistency)
  const getStatusColor = (status: string | undefined): string => {
    if (!status) return "bg-gray-500";
    switch (status.toLowerCase()) {
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

  // Fetch student data when component mounts or studentId changes
  useEffect(() => {
    if (!studentId) {
      setError("Student ID not found in URL.");
      setLoading(false);
      return;
    }

    const fetchStudentData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching data for student:", studentId);
        const response = await axios.get<{ student: StudentProfileData }>(
          `http://localhost:6001/api/metrobank/students/${studentId}`
        );

        console.log("API Response:", response.data);

        if (response.data && response.data.student) {
          setStudentData(response.data.student);
        } else {
          console.error("Invalid API response format:", response.data);
          setError("Student data not found or API response format incorrect.");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data?.message || error.message;
          setError(`Failed to fetch student data: ${errorMessage}`);
        } else {
          setError("An unexpected error occurred while fetching student data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleApprove = () => {
    // Add logic to approve student (e.g., API call)
    console.log("Approving student:", studentId);
    setAction("Approve");
    setShowModal(true);
  };

  const handleDeny = () => {
    // Add logic to deny student (e.g., API call)
    console.log("Denying student:", studentId);
    setAction("Deny");
    setShowModal(true);
  };

  const handleConfirm = () => {
    // Perform the actual approve/deny API call here based on 'action' state
    console.log(`Confirmed ${action} for student: ${studentId}`);
    setShowModal(false);
    // Optionally navigate back or refresh data
    // navigate("/metrobank/admin");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // Display loading state
  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <main className="flex-1 p-8 flex justify-center items-center">
          <div>Loading student data...</div>
        </main>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <main className="flex-1 p-8">
          <Header
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
          <div className="text-red-500 text-center mt-10">{error}</div>
        </main>
      </div>
    );
  }

  // Display "not found" if data is null after loading & no error
  if (!studentData) {
    return (
      <div className="flex h-screen bg-gray-50">
        <main className="flex-1 p-8">
          <Header
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
          <div className="text-center mt-10">Student not found.</div>
        </main>
      </div>
    );
  }

  // Display student profile if data is loaded
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Component */}

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {" "}
        {/* Added overflow-auto */}
        {/* Header */}
        <Header dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
        {/* Application Requirement Content */}
        <div className="flex flex-col space-y-6">
          {/* Profile Section - Updated with dynamic data */}
          <div className="border-2 border-blue-500 rounded-md p-3 mt-8 w-full max-w-[750px] mx-auto">
            <div className="flex flex-col items-center">
              <img
                src="/vaunia.png" // Replace with dynamic applicant profile image if available
                alt="Applicant Profile"
                className="w-16 h-16 rounded-full mb-3" // Reduced image size
              />
              <h2 className="text-base font-semibold text-custom-blue">
                {studentData.s_full_name}
              </h2>
              <p className="text-xs text-gray-600">{studentData.student_id}</p>
              <p className="text-xs text-gray-600">{studentData.s_campus}</p>
              {/* Display Status with colored dot */}
              <div className="flex items-center mt-2">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${getStatusColor(
                    studentData.applicationstatus
                  )}`}
                ></span>
                <p className="text-sm text-gray-700">
                  {studentData.applicationstatus}
                </p>
              </div>
            </div>
          </div>

          {/* Documents Section - Placeholder, update if documents are fetched */}
          <div className="border-2 border-blue-500 rounded-md p-3 mt-6 w-full max-w-[750px] mx-auto">
            <h3 className="text-base font-semibold text-custom-blue mb-3 flex items-center mt-2 ml-2">
              <FileText className="w-4 h-4 mr-2 text-custom-blue" />{" "}
              {/* Reduced icon size */}
              Documents
            </h3>
            <div className="space-y-2 divide-y divide-gray-200">
              {/* TODO: Map over studentData.documents if available */}
              <DocumentRow
                title="Application Form"
                filename="Placeholder.pdf"
              />
              <DocumentRow
                title="Birth Certificate"
                filename="Placeholder.pdf"
              />
              {/* Add more placeholder rows or map dynamic data */}
            </div>
          </div>

          {/* Action Buttons - Now aligned outside the document section */}
          <div className="flex justify-end space-x-4 mt-6 w-full max-w-[750px] mx-auto">
            {/* Conditionally render buttons based on status? */}
            <button
              onClick={handleApprove}
              className="bg-green-200 text-green-700 px-6 py-2 rounded-md hover:bg-green-300 disabled:opacity-50"
              // Example: Disable if already accepted/denied
              // disabled={studentData.applicationstatus === 'Accepted' || studentData.applicationstatus === 'Denied'}
            >
              Approve
            </button>
            <button
              onClick={handleDeny}
              className="bg-red-200 text-red-700 px-6 py-2 rounded-md hover:bg-red-300 disabled:opacity-50"
              // Example: Disable if already accepted/denied
              // disabled={studentData.applicationstatus === 'Accepted' || studentData.applicationstatus === 'Denied'}
            >
              Deny
            </button>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showModal}
        onClose={handleClose}
        onConfirm={handleConfirm}
        action={action}
      />
    </div>
  );
}

// Component for displaying each document row
function DocumentRow({ title, filename }: DocumentRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center pl-2">
        <FileText className="w-4 h-4 mr-2 text-gray-500" />
        <span className="text-sm text-gray-700">{title}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">{filename}</span>
        <button className="text-gray-500 hover:text-blue-500">
          <Fullscreen className="w-4 h-4" />
        </button>
        <button className="text-gray-500 hover:text-blue-500">
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default ApplicantProfile;
