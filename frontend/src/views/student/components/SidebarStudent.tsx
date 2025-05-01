import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Home,
  FileText,
  GraduationCap,
  ClipboardList,
  User,
  FileSignature,
} from "lucide-react";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: React.ReactNode;
  className?: string;
  active?: boolean;
}

function SidebarStudent() {
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
          <NavItem to="/" icon={<Home />} text="Home" />
          <NavItem
            to="/student/studentdashboard"
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
            to="/student/studentrequirementmanagement"
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
            to="/student/studenttechnicalassessmentoverview"
            icon={<GraduationCap />}
            text={
              <>
                <span>Technical</span>
                <br />
                <span>Assessment</span>
              </>
            }
            className="pl-10"
          />
          <NavItem
            to="/student/interviewmanagementoverview"
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
            to="/student/contract-management"
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
            to="/student/scholar-profile"
            icon={<GraduationCap />}
            text="Scholar Profile"
            className="pl-10"
          />
        </ul>
      </nav>
    </aside>
  );
}

function NavItem({ to, icon, text, className = "", active }: NavItemProps) {
  const isIndentedItem = className?.includes("pl-10");
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 p-3 rounded-xl ${className} ${
        active
          ? `bg-white text-[#024FA8] ${isIndentedItem ? "!w-[85%] !ml-7" : ""}`
          : "hover:bg-blue-700 text-white"
      }`}
    >
      <div
        className={`flex items-center space-x-2 ${
          active && isIndentedItem ? "-ml-5" : ""
        }`}
      >
        {icon} <span className="text-xs">{text}</span>
      </div>
    </Link>
  );
}

export default SidebarStudent;
