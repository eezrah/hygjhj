import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { createPortal } from "react-dom";

interface AdminNavbarProps {
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
}

function AdminNavbar({ dropdownOpen, setDropdownOpen }: AdminNavbarProps) {
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

export default AdminNavbar;