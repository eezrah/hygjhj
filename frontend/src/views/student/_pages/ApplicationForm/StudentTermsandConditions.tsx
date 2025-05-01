import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import axios from "axios";

// Add proper types for each form section
interface PersonalData {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  nickname: string;
  landline: string;
  mobileNumber: string;
  homeAddress: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  citizenship: string;
  civilStatus: string;
  religion: string;
  customSuffix: string;
}

interface StudentInformationData {
  School: string;
  schoolAddress: string;
  courseAndYearLevel: string;
  studentId: string;
  awards: Array<{
    rankAndName: string;
    description: string;
    awardingBody: string;
    dateAwarded: string;
    level: string;
  }>;
}

interface ExtracurricularData {
  activities: Array<{
    position: string;
    organizations: string;
    significantContribution: string;
    inclusiveYears: string;
    level: string;
  }>;
  communityActivities: Array<{
    activity: string;
    description: string;
    role: string;
    inclusiveDates: string;
  }>;
}

interface FamilyReferenceData {
  parents: Array<{
    fullName: string;
    age: string;
    relation: string;
    occupationLivelihood: string;
    presentEmploymentAddress: string;
    designationPosition: string;
    grossAnnualIncome: string;
  }>;
  studyingSiblings: Array<{
    fullName: string;
    schoolNameAddress: string;
    courseYearLevel: string;
    scholarshipPrivilege: string;
    scholarshipName: string;
    amount: string;
  }>;
  notStudyingSiblings: Array<{
    fullName: string;
    civilStatus: string;
    educationalAttainment: string;
    occupationLivelihood: string;
    presentEmployment: string;
    designationPosition: string;
    grossAnnualIncome: string;
  }>;
}

interface FinalFormData {
  personalData: PersonalData;
  studentInformation: StudentInformationData;
  extracurricularActivities: ExtracurricularData;
  familyReference: FamilyReferenceData;
}

const StudentTermsandConditions: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [checkboxes, setCheckboxes] = useState({
    filipino: false,
    notConcurrent: false,
    physicallyFit: false,
    goodMoral: false,
    certification: false,
  });

  const handleCheckboxChange = (field: keyof typeof checkboxes) => {
    setCheckboxes((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Add function to gather all form data with proper type checking
  const gatherAllFormData = (): FinalFormData | null => {
    try {
      // Gather all data from session storage
      const personalData = sessionStorage.getItem("personalData");
      const studentInformation = sessionStorage.getItem("studentInformation");
      const extracurricularActivities = sessionStorage.getItem(
        "extracurricularActivities"
      );
      const familyReference = sessionStorage.getItem("familyReference");

      // Check if all required data is present
      if (
        !personalData ||
        !studentInformation ||
        !extracurricularActivities ||
        !familyReference
      ) {
        console.error("Missing required form data in session storage:", {
          personalData: !!personalData,
          studentInformation: !!studentInformation,
          extracurricularActivities: !!extracurricularActivities,
          familyReference: !!familyReference,
        });
        return null;
      }

      // Parse all JSON data with type checking
      const finalFormData: FinalFormData = {
        personalData: JSON.parse(personalData),
        studentInformation: JSON.parse(studentInformation),
        extracurricularActivities: JSON.parse(extracurricularActivities),
        familyReference: JSON.parse(familyReference),
      };

      // Log the final form data for verification
      console.log("Final Form Data Gathered:", finalFormData);
      return finalFormData;
    } catch (error) {
      console.error("Error gathering form data:", error);
      return null;
    }
  };

  // Update handleNextPage to submit data
  const handleNextPage = async () => {
    // Check if all checkboxes are checked
    const allChecked = Object.values(checkboxes).every(
      (value) => value === true
    );

    if (!allChecked) {
      setShowAlert(true);
      return;
    }

    // Gather all form data
    const finalFormData = gatherAllFormData();

    if (!finalFormData) {
      setSubmissionError(
        "Some required information is missing. Please make sure you've completed all previous sections."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // Log the data being submitted
      console.log("Submitting Form Data:", finalFormData);

      // Submit the final form data
      const response = await axios.post(
        "http://localhost:6003/api/student/submit-application",
        finalFormData
      );

      console.log("Submission Response:", response.data);

      if (response.status === 200) {
        // Clear session storage after successful submission
        sessionStorage.clear();
        console.log("Session storage cleared after successful submission");

        // Navigate to the next page
        navigate("/student/studentsubmitapplication");
      } else {
        setSubmissionError("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmissionError(
        "An error occurred while submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    // Navigate to the previous page - adjust the path as needed
    navigate("/student/studentfamilyreference");
  };

  return (
    <div className="flex h-screen bg-white">
      <main className="flex-1 overflow-y-auto">
        {/* Progress Bar */}
        <ProgressTracker />

        {/* Application Form */}
        <div className="px-12 pt-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">
            Application Form
          </h2>

          {/* Show submission error if any */}
          {submissionError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
              {submissionError}
            </div>
          )}

          {/* Terms and Conditions Section */}
          <div className="mb-8 max-w-[95%] mx-auto">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-7 h-7 bg-white border-2 border-blue-600 text-blue-700 text-sm rounded-full">
                <span>5</span>
              </div>
              <span className="ml-2 font-semibold text-blue-700">
                Important Reminders:
              </span>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-700 mb-4">
                Applicants must meet the following criteria and submit necessary
                supporting documents
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="filipino"
                    checked={checkboxes.filipino}
                    onChange={() => handleCheckboxChange("filipino")}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="filipino" className="text-sm text-gray-700">
                    A Filipino Citizen as evidenced by a certified true copy of
                    Birth Certificate (original must be presented for
                    authentication purposes);
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="notConcurrent"
                    checked={checkboxes.notConcurrent}
                    onChange={() => handleCheckboxChange("notConcurrent")}
                    className="mt-1 mr-3"
                  />
                  <label
                    htmlFor="notConcurrent"
                    className="text-sm text-gray-700"
                  >
                    Not concurrently a recipient of any major scholarship or
                    financial aid(e.g. pre-need educational plans, DOST, or
                    other academic-related scholarship, etc.) as attested to in
                    a duly-notarized affidavit;
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="physicallyFit"
                    checked={checkboxes.physicallyFit}
                    onChange={() => handleCheckboxChange("physicallyFit")}
                    className="mt-1 mr-3"
                  />
                  <label
                    htmlFor="physicallyFit"
                    className="text-sm text-gray-700"
                  >
                    Physically fit as evidenced by a Medical Certificate from a
                    qualified physician; and
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="goodMoral"
                    checked={checkboxes.goodMoral}
                    onChange={() => handleCheckboxChange("goodMoral")}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="goodMoral" className="text-sm text-gray-700">
                    Of good moral character as evidenced by a certification the
                    Student Affairs Office of the University.
                  </label>
                </div>
              </div>
            </div>

            {/* Certification by the Applicant */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-7 h-7 bg-white border-2 border-blue-600 text-blue-700 text-sm rounded-full">
                  <span>6</span>
                </div>
                <span className="ml-2 font-semibold text-blue-700">
                  Certification by the Applicant
                </span>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="certification"
                  checked={checkboxes.certification}
                  onChange={() => handleCheckboxChange("certification")}
                  className="mt-1 mr-3"
                />
                <label
                  htmlFor="certification"
                  className="text-sm text-gray-700"
                >
                  I hereby certify to the best of my knowledge that all the
                  information contained in this form is true and correct. I am
                  aware that any willful misrepresentation of facts stated
                  herein can be used as basis for my disqualification.
                </label>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end space-x-4 mt-4 mb-6">
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              disabled={isSubmitting}
            >
              Back
            </button>
            <button
              onClick={handleNextPage}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none disabled:bg-blue-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </div>
      </main>

      {/* Custom Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg border-2 border-blue-500">
            <div className="flex items-center mb-4">
              <XCircle className="h-6 w-6 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Reminder</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Please agree to all terms and conditions before proceeding.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAlert(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProgressTracker: React.FC = () => {
  const steps = [
    { step: 1, label: "Details and Eligibility", isActive: true },
    { step: 2, label: "Application Form", isActive: true },
    { step: 3, label: "Requirements", isActive: false },
    { step: 4, label: "Application Status", isActive: false },
  ];

  return (
    <div className="flex items-center justify-center py-6 px-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.step}>
          {/* Step Circle and Label */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-semibold text-sm ${
                step.isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-blue-600 border-blue-600"
              }`}
            >
              {step.step}
            </div>
            <span className="text-xs text-blue-600 mt-2 text-center">
              {step.label}
            </span>
          </div>

          {/* Connecting Line (Rendered between steps) */}
          {index < steps.length - 1 && (
            <div className="w-29 h-[1px] bg-gray-300 mx-1 self-center mb-6"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StudentTermsandConditions;
