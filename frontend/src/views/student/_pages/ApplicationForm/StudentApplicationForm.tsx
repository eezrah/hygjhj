import React, { useState } from "react";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentApplicationForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-blue-50">
      <div className="flex-1 p-4 pl-6 overflow-auto">
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

          {/* Back Button */}
          <div className="flex justify-end mt-7 mr-2">
            <button
              onClick={() => navigate("/student/studentapplicationstatus")}
              className="px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Back
            </button>
          </div>
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

const PersonalDataForm: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Name
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <FormField label="First Name" />
          <FormField label="Middle Name" />
          <FormField label="Last Name" />
          <FormField label="Suffix" />
          <FormField label="Nickname" />
        </div>
      </div>

      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Personal Information
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <FormField label="Date of Birth" />
          <FormField label="Age" />
          <FormField label="Gender" />
          <FormField label="Citizenship" />
          <FormField label="Civil Status" />
          <FormField label="Religion" />
        </div>
      </div>

      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Contact Information
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <FormField label="Landline" />
          <FormField label="Mobile Number" />
          <FormField label="Address" />
        </div>
      </div>
    </div>
  );
};

const StudentInformationForm: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          School Information
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <FormField label="School" />
          <FormField label="School Address" />
        </div>
      </div>

      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Student Detail
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <FormField label="Course and Year Level" />
          <FormField label="Student ID" />
        </div>
      </div>

      <div className="col-span-2">
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Awards and Recognition
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <div className="flex border-t border-blue-500 text-sm">
            <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Rank and Name of Board
            </div>
            <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Award Description
            </div>
            <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Award-giving Body
            </div>
            <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-r border-blue-500">
              Date Received
            </div>
            <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-blue-500 text-xs">
              Level (Int'l, National, Regional, District, School)
            </div>
          </div>
          <div className="flex border-t border-blue-500 text-sm bg-white">
            <div className="w-1/5 p-2 border-r border-blue-500"></div>
            <div className="w-1/5 p-2 border-r border-blue-500"></div>
            <div className="w-1/5 p-2 border-r border-blue-500"></div>
            <div className="w-1/5 p-2 border-r border-blue-500"></div>
            <div className="w-1/5 p-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExtraCurricularForm: React.FC = () => {
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
          <div className="w-1/5 p-2 text-blue-800 bg-blue-100 border-blue-500 text-xs">
            Level (Int'l, National, Regional, District, School)
          </div>
        </div>
        <div className="flex border-t border-blue-500 text-sm bg-white">
          <div className="w-1/5 p-2 border-r border-blue-500"></div>
          <div className="w-1/5 p-2 border-r border-blue-500"></div>
          <div className="w-1/5 p-2 border-r border-blue-500"></div>
          <div className="w-1/5 p-2 border-r border-blue-500"></div>
          <div className="w-1/5 p-2"></div>
        </div>
      </div>
    </div>
  );
};

const CommunityInvolvementForm: React.FC = () => {
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
        <div className="flex border-t border-blue-500 text-sm bg-white">
          <div className="w-1/4 p-2 border-r border-blue-500"></div>
          <div className="w-1/4 p-2 border-r border-blue-500"></div>
          <div className="w-1/4 p-2 border-r border-blue-500"></div>
          <div className="w-1/4 p-2"></div>
        </div>
      </div>
    </div>
  );
};

const FamilyReferenceForm: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Parents
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <div className="flex text-sm">
            <div className="w-1/7 p-2 text-blue-800 bg-blue-50 border-r border-blue-500">
              Full Name
            </div>
            <div className="w-1/12 p-2 text-blue-800 bg-blue-50 border-r border-blue-500">
              Age
            </div>
            <div className="w-1/12 p-2 text-blue-800 bg-blue-50 border-r border-blue-500">
              Relation
            </div>
            <div className="w-1/7 p-2 text-blue-800 bg-blue-50 border-r border-blue-500">
              Occupation/ Livelihood
            </div>
            <div className="w-1/4 p-2 text-blue-800 bg-blue-50 border-r border-blue-500">
              Present Employment / Address
            </div>
            <div className="w-1/7 p-2 text-blue-800 bg-blue-50 border-r border-blue-500">
              Designation Position
            </div>
            <div className="w-1/7 p-2 text-blue-800 bg-blue-50">
              Gross Annual Income
            </div>
          </div>
          <div className="flex border-t border-blue-500 text-sm bg-white h-12">
            <div className="w-1/7 p-2 border-r border-blue-500"></div>
            <div className="w-1/12 p-2 border-r border-blue-500"></div>
            <div className="w-1/12 p-2 border-r border-blue-500"></div>
            <div className="w-1/7 p-2 border-r border-blue-500"></div>
            <div className="w-1/4 p-2 border-r border-blue-500"></div>
            <div className="w-1/7 p-2 border-r border-blue-500"></div>
            <div className="w-1/7 p-2"></div>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Brothers / Sisters STILL STUDYING
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <div className="flex text-sm">
            <div className="w-1/4 p-2 text-blue-800 bg-blue-50 border-r border-blue-500">
              Full Name of Brothers / Sisters
            </div>
            <div className="w-1/4 p-2 text-blue-800 bg-blue-50 border-r border-blue-500">
              Name and Address of School
            </div>
            <div className="w-1/5 p-2 text-blue-800 bg-blue-50 border-r border-blue-500">
              Course and Year Level
            </div>
            <div className="w-1/3 bg-blue-50 border-r border-blue-500">
              <div className="p-2 text-blue-800 text-center">
                Scholarship availed, if there is any
              </div>
              <div className="flex text-sm border-t border-blue-500">
                <div className="w-1/2 p-2 text-blue-800 text-center border-r border-blue-500">
                  Privilege (Full/Partial)
                </div>
                <div className="w-1/2 p-2 text-blue-800 text-center">
                  Name of Scholarship
                </div>
              </div>
            </div>
            <div className="w-1/6 p-2 text-blue-800 bg-blue-50">Amount</div>
          </div>
          <div className="flex border-t border-blue-500 text-sm bg-white h-12">
            <div className="w-1/4 p-2 border-r border-blue-500"></div>
            <div className="w-1/4 p-2 border-r border-blue-500"></div>
            <div className="w-1/5 p-2 border-r border-blue-500"></div>
            <div className="w-1/3 border-r border-blue-500">
              <div className="flex h-full">
                <div className="w-1/2 border-r border-blue-500"></div>
                <div className="w-1/2"></div>
              </div>
            </div>
            <div className="w-1/6 p-2"></div>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-blue-700 text-white py-2 px-3 text-sm font-medium rounded-t-md text-center">
          Brothers/Sisters NOT or NO LONGER STUDYING
        </div>
        <div className="bg-blue-50 border border-blue-500 rounded-b-md overflow-hidden">
          <div className="flex text-sm">
            <div className="w-1/5 p-2 text-blue-800 bg-blue-50 border-r border-blue-500">
              Full Name of Brothers / Sisters
            </div>
            <div className="w-1/8 p-2 text-blue-800 bg-blue-50 border-r border-blue-500">
              Civil Status
            </div>
            <div className="w-1/5 p-2 text-blue-800 bg-blue-50 border-r border-blue-500">
              Educational Attainment
            </div>
            <div className="w-1/5 p-2 text-blue-800 bg-blue-50 border-r border-blue-500">
              Occupation/ Livelihood
            </div>
            <div className="w-1/5 p-2 text-blue-800 bg-blue-50 border-r border-blue-500">
              Present Employment
            </div>
            <div className="w-1/8 p-2 text-blue-800 bg-blue-50 border-r border-blue-500">
              Designation Position
            </div>
            <div className="w-1/8 p-2 text-blue-800 bg-blue-50">
              Gross Annual Income
            </div>
          </div>
          <div className="flex border-t border-blue-500 text-sm bg-white h-12">
            <div className="w-1/5 p-2 border-r border-blue-500"></div>
            <div className="w-1/8 p-2 border-r border-blue-500"></div>
            <div className="w-1/5 p-2 border-r border-blue-500"></div>
            <div className="w-1/5 p-2 border-r border-blue-500"></div>
            <div className="w-1/5 p-2 border-r border-blue-500"></div>
            <div className="w-1/8 p-2 border-r border-blue-500"></div>
            <div className="w-1/8 p-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormField: React.FC<{ label: string }> = ({ label }) => {
  return (
    <div className="flex border-t border-blue-500">
      <div className="w-1/3 p-2 text-sm text-blue-800 bg-blue-100 border-r border-blue-500">
        {label}
      </div>
      <div className="w-2/3 p-2 text-sm bg-blue-50"></div>
    </div>
  );
};

export default StudentApplicationForm;
