// Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, LogOut } from "lucide-react";
import axios from "axios";
import { resetAuthCache } from "../../../utils/authUtils";

interface NavbarProps {
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  pageTitle?: string; // Optional title prop
}

const Navbar: React.FC<NavbarProps> = ({ 
  dropdownOpen, 
  setDropdownOpen, 
  pageTitle = "Application Requirement" // Default title
}) => {
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
    } catch (error) {
      console.error("Logout error:", error);
      // Still navigate to login even if there's an error
      navigate("/student/studentlogin");
    }
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-100">
      <div className="flex justify-between items-center px-8 py-4">
        {/* Back Button and Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-blue-50 rounded-lg transition duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-blue-600" />
          </button>
          <h1 className="text-xl font-bold text-blue-800">
            {pageTitle}
          </h1>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700">
                Evangelista, Julcris C.
              </p>
              <p className="text-xs text-gray-500">STI Ortigas-Cainta</p>
            </div>
            <img
              src="/vaunia.png"
              alt="Student Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-100"
            />
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
