import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  ChevronDown,
  ChevronUp,
  FileText,
  ArrowLeft,
  LogOut,
} from "lucide-react";

const ApplicantForm: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  // Load all forms when studentId changes
  useEffect(() => {
    if (!studentId) {
      console.error("No student ID provided");
      return;
    }
  }, [studentId]);

  return (
    <div className="flex h-screen bg-blue-50">
      <div className="flex-1 p-4 pl-6 overflow-auto">
        {/* Navbar */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-[#024FA8]/10 relative">
          <div className="flex justify-between items-center px-10 py-4 ">
            {/* Back Button */}
            <div
              className="flex items-center space-x-4 group cursor-pointer"
              onClick={() => navigate("/metrobank/admin")}
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
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-2xl rounded-xl p-2 border border-[#024FA8]/10">
                  <button
                    className="flex items-center w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-[#F0F7FF] hover:to-[#E0F2FE] text-[#024FA8] text-sm rounded-lg transition-all group"
                    onClick={() => navigate("/login")}
                  >
                    <LogOut className="w-4 h-4 mr-3 transition-transform group-hover:translate-x-1" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Existing ApplicantForm Content */}
        <div className="max-w-full mx-4">
          {/* Header Profile Card */}
          <div className="bg-white rounded-lg p-4 mt-2 mb-8 shadow-sm flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/api/placeholder/64/64"
                alt="Profile"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-blue-700 font-medium">
                  Evangelista, Julcris C.
                </h3>
                <p className="text-sm text-gray-600">02000299504</p>
                <p className="text-sm text-gray-600">
                  STI College Ortigas-Cainta
                </p>
              </div>
            </div>
            <div className="text-blue-500">
              <FileText size={24} />
            </div>
          </div>

          {/* Application Form Title */}
          <div className="flex items-center mb-6 pl-2">
            <FileText className="text-blue-600 mr-2" size={20} />
            <h2 className="text-blue-700 font-medium text-lg">
              Application Form
            </h2>
          </div>

          {/* Accordion Sections */}
          <AccordionSection
            number={1}
            title="Personal Data"
            content={<PersonalDataForm />}
          />

          <AccordionSection
            number={2}
            title="Student Information"
            content={<StudentInformationForm />}
          />

          <AccordionSection
            number={3}
            title="Extra / Co-Curricular Activities"
            content={<ExtraCurricularForm />}
          />

          <AccordionSection
            number={4}
            title="Community Involvement"
            content={<CommunityInvolvementForm />}
          />

          <AccordionSection
            number={5}
            title="Family Reference"
            content={<FamilyReferenceForm />}
          />
        </div>
      </div>
    </div>
  );
};

interface AccordionSectionProps {
  number: number;
  title: string;
  content: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  number,
  title,
  content,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
      <div
        className="flex items-center justify-between bg-white px-4 py-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center bg-blue-500 text-white rounded-full w-6 h-6 text-xs">
            {number}
          </div>
          <h4 className="ml-3 text-blue-600">{title}</h4>
        </div>
        {isOpen ? (
          <ChevronUp className="text-gray-400" size={20} />
        ) : (
          <ChevronDown className="text-gray-400" size={20} />
        )}
      </div>
      {isOpen && <div className="p-4 bg-blue-50">{content}</div>}
    </div>
  );
};

interface FormFieldProps {
  label: string;
  value?: string | number;
  isLoading?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, isLoading }) => {
  return (
    <div className="flex border-t border-blue-500">
      <div className="w-1/3 p-2 text-sm text-blue-800 bg-blue-100 border-r border-blue-500">
        {label}
      </div>
      <div className="w-2/3 p-2 text-sm bg-blue-50">
        {isLoading ? (
          <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
        ) : (
          value
        )}
      </div>
    </div>
  );
};

const PersonalDataForm: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [personalData, setPersonalData] = useState({
    a_firstname: "",
    a_middlename: "",
    a_lastname: "",
    a_suffix: "",
    a_dateofbirth: "",
    a_age: "",
    a_gender: "",
    a_citizenship: "",
    a_civilstatus: "",
    a_religion: "",
    a_landlinenumber: "",
    a_mobilenumber: "",
    a_homeaddress: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalData = async () => {
      if (!studentId) {
        setError("No student ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:6001/api/metrobank/personal-data/${studentId}`
        );
        setPersonalData(response.data.PersonalData);
      } catch (error) {
        console.error("Error fetching personal data:", error);
        setError("Failed to load personal data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersonalData();
  }, [studentId]);

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-md border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Name
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <FormField
            label="First Name"
            value={personalData.a_firstname}
            isLoading={isLoading}
          />
          <FormField
            label="Middle Name"
            value={personalData.a_middlename}
            isLoading={isLoading}
          />
          <FormField
            label="Last Name"
            value={personalData.a_lastname}
            isLoading={isLoading}
          />
          <FormField
            label="Suffix"
            value={personalData.a_suffix}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Personal Information
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <FormField
            label="Date of Birth"
            value={personalData.a_dateofbirth?.split("T")[0]}
            isLoading={isLoading}
          />
          <FormField
            label="Age"
            value={personalData.a_age}
            isLoading={isLoading}
          />
          <FormField
            label="Gender"
            value={personalData.a_gender}
            isLoading={isLoading}
          />
          <FormField
            label="Citizenship"
            value={personalData.a_citizenship}
            isLoading={isLoading}
          />
          <FormField
            label="Civil Status"
            value={personalData.a_civilstatus}
            isLoading={isLoading}
          />
          <FormField
            label="Religion"
            value={personalData.a_religion}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Contact Information
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <FormField
            label="Landline"
            value={personalData.a_landlinenumber}
            isLoading={isLoading}
          />
          <FormField
            label="Mobile Number"
            value={personalData.a_mobilenumber}
            isLoading={isLoading}
          />
          <FormField
            label="Address"
            value={personalData.a_homeaddress}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

const StudentInformationForm: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [studentInfo, setStudentInfo] = useState({
    school: "",
    school_address: "",
    course_and_year_level: "",
    student_id: "",
    award_name: "",
    award_description: "",
    award_giving_body: "",
    date_awarded: "",
    award_level: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      if (!studentId) {
        setError("No student ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:6001/api/metrobank/student-info/${studentId}`
        );
        setStudentInfo(response.data.data);
      } catch (error) {
        console.error("Error fetching student information:", error);
        setError("Failed to load student information. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentInfo();
  }, [studentId]);

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-md border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          School Information
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <FormField
            label="School"
            value={studentInfo.school}
            isLoading={isLoading}
          />
          <FormField
            label="School Address"
            value={studentInfo.school_address}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Student Detail
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <FormField
            label="Course and Year Level"
            value={studentInfo.course_and_year_level}
            isLoading={isLoading}
          />
          <FormField
            label="Student ID"
            value={studentInfo.student_id}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className="col-span-2">
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Awards and Recognition
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <div className="flex border-t border-blue-500 text-sm">
            <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Award Name
            </div>
            <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Award Description
            </div>
            <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Award-giving Body
            </div>
            <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Date Awarded
            </div>
            <div className="w-1/5 p-2 text-blue-800 bg-blue-100">Level</div>
          </div>
          {isLoading ? (
            <div className="flex border-t border-blue-500 text-sm bg-white p-4 justify-center">
              <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
            </div>
          ) : studentInfo.award_name ? (
            <div className="flex border-t border-blue-500 text-sm bg-white">
              <div className="w-1/5 p-2 border-r border-blue-500">
                {studentInfo.award_name}
              </div>
              <div className="w-1/5 p-2 border-r border-blue-500">
                {studentInfo.award_description}
              </div>
              <div className="w-1/5 p-2 border-r border-blue-500">
                {studentInfo.award_giving_body}
              </div>
              <div className="w-1/5 p-2 border-r border-blue-500">
                {studentInfo.date_awarded}
              </div>
              <div className="w-1/5 p-2">{studentInfo.award_level}</div>
            </div>
          ) : (
            <div className="flex border-t border-blue-500 text-sm bg-white p-4 justify-center text-gray-500">
              No awards found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ExtraCurricularForm: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [activities, setActivities] = useState<
    Array<{
      ap_position: string;
      organizations: string;
      significant_contribution: string;
      inclusive_years: string;
      level: string;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!studentId) {
        setError("No student ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:6001/api/metrobank/curricular-activities/${studentId}`
        );
        setActivities(response.data.data);
      } catch (error) {
        console.error("Error fetching extra-curricular activities:", error);
        setError(
          "Failed to load extra-curricular activities. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, [studentId]);

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-md border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
        Extra / Co-Curricular Activities
      </div>
      <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
        <div className="flex border-t border-blue-500 text-sm">
          <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
            Position
          </div>
          <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
            Organization
          </div>
          <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
            Significant Contributions
          </div>
          <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
            Inclusive Years
          </div>
          <div className="w-1/5 p-2 text-blue-800 bg-blue-100">Level</div>
        </div>
        {isLoading ? (
          <div className="flex border-t border-blue-500 text-sm bg-white p-4 justify-center">
            <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
          </div>
        ) : activities && activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={index}
              className="flex border-t border-blue-500 text-sm bg-white"
            >
              <div className="w-1/5 p-2 border-r border-blue-500">
                {activity.ap_position}
              </div>
              <div className="w-1/5 p-2 border-r border-blue-500">
                {activity.organizations}
              </div>
              <div className="w-1/5 p-2 border-r border-blue-500">
                {activity.significant_contribution}
              </div>
              <div className="w-1/5 p-2 border-r border-blue-500">
                {activity.inclusive_years}
              </div>
              <div className="w-1/5 p-2">{activity.level}</div>
            </div>
          ))
        ) : (
          <div className="flex border-t border-blue-500 text-sm bg-white p-4 justify-center text-gray-500">
            No extra-curricular activities found
          </div>
        )}
      </div>
    </div>
  );
};

const CommunityInvolvementForm: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [activities, setActivities] = useState<
    Array<{
      community_activities: string;
      activity_description: string;
      role: string;
      inclusive_years: string;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunityActivities = async () => {
      if (!studentId) {
        setError("No student ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:6001/api/metrobank/community-involvement/${studentId}`
        );
        setActivities(response.data.data);
      } catch (error) {
        console.error("Error fetching community activities:", error);
        setError(
          "Failed to load community activities. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunityActivities();
  }, [studentId]);

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-md border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
        Community Involvement
      </div>
      <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
        <div className="flex border-t border-blue-500 text-sm">
          <div className="w-1/4 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
            Community Activities
          </div>
          <div className="w-1/4 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
            Activity Description
          </div>
          <div className="w-1/4 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
            Role
          </div>
          <div className="w-1/4 p-2 text-blue-800 bg-blue-100 border-blue-500">
            Inclusive Dates
          </div>
        </div>
        {isLoading ? (
          <div className="flex border-t border-blue-500 text-sm bg-white p-4 justify-center">
            <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
          </div>
        ) : activities && activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={index}
              className="flex border-t border-blue-500 text-sm bg-white"
            >
              <div className="w-1/4 p-2 border-r border-blue-500">
                {activity.community_activities}
              </div>
              <div className="w-1/4 p-2 border-r border-blue-500">
                {activity.activity_description}
              </div>
              <div className="w-1/4 p-2 border-r border-blue-500">
                {activity.role}
              </div>
              <div className="w-1/4 p-2">{activity.inclusive_years}</div>
            </div>
          ))
        ) : (
          <div className="flex border-t border-blue-500 text-sm bg-white p-4 justify-center text-gray-500">
            No community activities found
          </div>
        )}
      </div>
    </div>
  );
};

const FamilyReferenceForm: React.FC = () => {
  interface Parent {
    parent_fullname: string;
    parent_age: string;
    parent_relation: string;
    parent_occupation: string;
    parent_employment_address: string;
  }

  interface StudyingSibling {
    sibling_name: string;
    sibling_school_and_address: string;
    sibling_course_year_level: string;
    scholarship_privilege: string;
    scholarship_name: string;
  }

  interface NotStudyingSibling {
    sibling_name: string;
    sibling_civil_status: string;
    sibling_educational_attainment: string;
    sibling_occupation_livelihood: string;
    sibling_employment: string;
    sibling_position: string;
    sibling_gross_anual_income: string;
  }

  const { studentId } = useParams<{ studentId: string }>();
  const [familyData, setFamilyData] = useState<{
    parents: Parent[];
    studyingSiblings: StudyingSibling[];
    notStudyingSiblings: NotStudyingSibling[];
    message: string;
  }>({
    parents: [],
    studyingSiblings: [],
    notStudyingSiblings: [],
    message: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFamilyReference = async () => {
      if (!studentId) {
        setError("No student ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:6001/api/metrobank/family-reference/${studentId}`
        );
        // Update this line to use the response data directly since it already has the correct structure
        setFamilyData(response.data);
      } catch (error) {
        console.error("Error fetching family reference:", error);
        setError(
          "Failed to load family reference data. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchFamilyReference();
  }, [studentId]);

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-md border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Parents
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <div className="flex text-sm">
            <div className="w-1/4 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Full Name
            </div>
            <div className="w-1/12 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Age
            </div>
            <div className="w-1/12 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Relation
            </div>
            <div className="w-1/4 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Occupation
            </div>
            <div className="w-1/3 p-2 text-blue-800 bg-blue-100">
              Employment Address
            </div>
          </div>
          {isLoading ? (
            <div className="flex border-t border-blue-500 text-sm bg-white p-4 justify-center">
              <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
            </div>
          ) : familyData.parents && familyData.parents.length > 0 ? (
            familyData.parents.map((parent, index) => (
              <div
                key={index}
                className="flex border-t border-blue-500 text-sm bg-white"
              >
                <div className="w-1/4 p-2 border-r border-blue-500">
                  {parent.parent_fullname}
                </div>
                <div className="w-1/12 p-2 border-r border-blue-500">
                  {parent.parent_age}
                </div>
                <div className="w-1/12 p-2 border-r border-blue-500">
                  {parent.parent_relation}
                </div>
                <div className="w-1/4 p-2 border-r border-blue-500">
                  {parent.parent_occupation}
                </div>
                <div className="w-1/3 p-2">
                  {parent.parent_employment_address}
                </div>
              </div>
            ))
          ) : (
            <div className="flex border-t border-blue-500 text-sm bg-white p-4 justify-center text-gray-500">
              No parent information found
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Brothers / Sisters STILL STUDYING
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <div className="flex text-sm">
            <div className="w-1/4 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Full Name
            </div>
            <div className="w-1/4 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              School and Address
            </div>
            <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Course and Year Level
            </div>
            <div className="w-1/6 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Scholarship Privilege
            </div>
            <div className="w-1/6 p-2 text-blue-800 bg-blue-100">
              Scholarship Name
            </div>
          </div>
          {isLoading ? (
            <div className="flex border-t border-blue-500 text-sm bg-white p-4 justify-center">
              <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
            </div>
          ) : familyData.studyingSiblings &&
            familyData.studyingSiblings.length > 0 ? (
            familyData.studyingSiblings.map((sibling, index) => (
              <div
                key={index}
                className="flex border-t border-blue-500 text-sm bg-white"
              >
                <div className="w-1/4 p-2 border-r border-blue-500">
                  {sibling.sibling_name}
                </div>
                <div className="w-1/4 p-2 border-r border-blue-500">
                  {sibling.sibling_school_and_address}
                </div>
                <div className="w-1/5 p-2 border-r border-blue-500">
                  {sibling.sibling_course_year_level}
                </div>
                <div className="w-1/6 p-2 border-r border-blue-500">
                  {sibling.scholarship_privilege}
                </div>
                <div className="w-1/6 p-2">{sibling.scholarship_name}</div>
              </div>
            ))
          ) : (
            <div className="flex border-t border-blue-500 text-sm bg-white p-4 justify-center text-gray-500">
              No studying siblings found
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Brothers/Sisters NOT or NO LONGER STUDYING
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <div className="flex text-sm">
            <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Full Name
            </div>
            <div className="w-1/7 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Civil Status
            </div>
            <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Educational Attainment
            </div>
            <div className="w-1/7 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Occupation
            </div>
            <div className="w-1/6 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Employment
            </div>
            <div className="w-1/7 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Position
            </div>
            <div className="w-1/7 p-2 text-blue-800 bg-blue-100">
              Annual Income
            </div>
          </div>
          {isLoading ? (
            <div className="flex border-t border-blue-500 text-sm bg-white p-4 justify-center">
              <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
            </div>
          ) : familyData.notStudyingSiblings &&
            familyData.notStudyingSiblings.length > 0 ? (
            familyData.notStudyingSiblings.map((sibling, index) => (
              <div
                key={index}
                className="flex border-t border-blue-500 text-sm bg-white"
              >
                <div className="w-1/5 p-2 border-r border-blue-500">
                  {sibling.sibling_name}
                </div>
                <div className="w-1/7 p-2 border-r border-blue-500">
                  {sibling.sibling_civil_status}
                </div>
                <div className="w-1/5 p-2 border-r border-blue-500">
                  {sibling.sibling_educational_attainment}
                </div>
                <div className="w-1/7 p-2 border-r border-blue-500">
                  {sibling.sibling_occupation_livelihood}
                </div>
                <div className="w-1/6 p-2 border-r border-blue-500">
                  {sibling.sibling_employment}
                </div>
                <div className="w-1/7 p-2 border-r border-blue-500">
                  {sibling.sibling_position}
                </div>
                <div className="w-1/7 p-2">
                  {sibling.sibling_gross_anual_income}
                </div>
              </div>
            ))
          ) : (
            <div className="flex border-t border-blue-500 text-sm bg-white p-4 justify-center text-gray-500">
              No non-studying siblings found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantForm;
