import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  FileText,
  GraduationCap,
  ClipboardList,
  User,
  FileSignature,
  ChevronDown,
  ChevronUp,
  PenTool,
  Users,
} from "lucide-react";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: React.ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
  isDropdownOpen?: boolean;
  dropdownItems?: { to: string; icon: React.ReactNode; text: string }[];
  onDropdownItemClick?: () => void;
}

function Sidebar() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const handleDropdownItemClick = () => {
    setIsAssessmentOpen(false); // Close dropdown when item is clicked
  };

  return (
    <aside className="w-50 bg-[#024FA8] text-white flex flex-col shadow-md">
      <div className="flex w-full justify-center mt-3">
        <div className="p-3 flex space-x-1 items-center">
          <img
            src="/metrobanklogo.png"
            alt="Metrobank Logo"
            className="size-7 mt-5 ml-1"
          />
          <p className="text-xs text-white font-bold -space-y-1 mt-5 pr-3">
            Metrobank STRONG
            <br /> Program Management
          </p>
        </div>
      </div>
      <nav className="flex-1 flex flex-col justify-center py-2 px-4 text-xs">
        <ul className="space-y-5">
          <NavItem to="/metrobank" icon={<Home />} text="Home" />
          <NavItem
            to="/metrobank/admindashboard"
            icon={<FileText />}
            text={
              <>
                <span>Application</span>
                <br />
                <span>Management</span>
              </>
            }
          />
          <NavItem
            to="/metrobank/admin"
            icon={<ClipboardList />}
            text={
              <>
                <span>Requirement</span>
                <br />
                <span>Management</span>
              </>
            }
            className="pl-10"
          />
          <NavItem
            to="#"
            icon={<GraduationCap />}
            text={
              <>
                <span>Technical</span>
                <br />
                <span>Assessment</span>
              </>
            }
            className="pl-10"
            onClick={() => setIsAssessmentOpen(!isAssessmentOpen)}
            isDropdownOpen={isAssessmentOpen}
            dropdownItems={[
              {
                to: "/metrobank/createexam",
                icon: <PenTool size={16} />,
                text: "Create Exam"
              },
              {
                to: "/metrobank/technical-assessment/examinees",
                icon: <Users size={16} />,
                text: "Examinees"
              }
            ]}
            onDropdownItemClick={handleDropdownItemClick}
          />
          <NavItem
            to="/metrobank/interview-management"
            icon={<User />}
            text={
              <>
                <span>Interview</span>
                <br />
                <span>Management</span>
              </>
            }
            className="pl-10"
          />
          <NavItem
            to="/metrobank/contract-management"
            icon={<FileSignature />}
            text={
              <>
                <span>Contract</span>
                <br />
                <span>Management</span>
              </>
            }
            className="pl-10"
          />
          <NavItem
            to="/metrobank/scholar-profile"
            icon={<GraduationCap />}
            text="Scholar Profile"
            className="pl-10"
          />
        </ul>
      </nav>
    </aside>
  );
}

function NavItem({ to, icon, text, className = "", active, onClick, isDropdownOpen, dropdownItems, onDropdownItemClick }: NavItemProps) {
  const isIndentedItem = className?.includes("pl-10");
  
  return (
    <li>
      {to !== "#" ? (
        <Link to={to}>
          <div
            className={`flex items-center justify-between p-3 rounded-xl ${className} ${
              active
                ? `bg-white text-[#024FA8] ${isIndentedItem ? "!w-[85%] !ml-7" : ""}`
                : "hover:bg-blue-700 text-white cursor-pointer"
            }`}
          >
            <div
              className={`flex items-center space-x-2 ${
                active && isIndentedItem ? "-ml-5" : ""
              }`}
            >
              {icon} <span className="text-xs">{text}</span>
            </div>
            {dropdownItems && (
              <span className="ml-2">
                {isDropdownOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </span>
            )}
          </div>
        </Link>
      ) : (
        <div
          onClick={onClick}
          className={`flex items-center justify-between p-3 rounded-xl ${className} ${
            active
              ? `bg-white text-[#024FA8] ${isIndentedItem ? "!w-[85%] !ml-7" : ""}`
              : "hover:bg-blue-700 text-white cursor-pointer"
          }`}
        >
          <div
            className={`flex items-center space-x-2 ${
              active && isIndentedItem ? "-ml-5" : ""
            }`}
          >
            {icon} <span className="text-xs">{text}</span>
          </div>
          {dropdownItems && (
            <span className="ml-2">
              {isDropdownOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </span>
          )}
        </div>
      )}
      
      {isDropdownOpen && dropdownItems && (
        <div className="relative ml-14 mt-2">
          {/* Vertical line */}
          <div className="absolute left-[-5px] top-0 w-[2px] h-full bg-white"></div>
          
          <ul className="space-y-2 pl-2">
            {dropdownItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  onClick={onDropdownItemClick}
                  className="flex items-center space-x-1 p-2 hover:bg-blue-700 rounded-lg"
                >
                  {item.icon}
                  <span className="text-white text-xs">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default Sidebar;
