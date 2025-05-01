import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CirclePlus, Trash2, AlertCircle } from "lucide-react";

interface StudentInformationData {
  academicHonor1stSemester: string;
  avgGrade1stSemester: string;
  academicHonor2ndSemester: string;
  avgGrade2ndSemester: string;
  majorSubject1stSemester1: string;
  avgGrade1stSemester1: string;
  majorSubject1stSemester2: string;
  avgGrade1stSemester2: string;
  majorSubject2ndSemester1: string;
  avgGrade2ndSemester1: string;
  majorSubject2ndSemester2: string;
  avgGrade2ndSemester2: string;
  // 2nd Year data
  academicHonor1stSemester2ndYear: string;
  avgGrade1stSemester2ndYear: string;
  academicHonor2ndSemester2ndYear: string;
  avgGrade2ndSemester2ndYear: string;
  majorSubject1stSemester1_2ndYear: string;
  avgGrade1stSemester1_2ndYear: string;
  majorSubject1stSemester2_2ndYear: string;
  avgGrade1stSemester2_2ndYear: string;
  majorSubject2ndSemester1_2ndYear: string;
  avgGrade2ndSemester1_2ndYear: string;
  majorSubject2ndSemester2_2ndYear: string;
  avgGrade2ndSemester2_2ndYear: string;
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

const initialFormData: StudentInformationData = {
  academicHonor1stSemester: "",
  avgGrade1stSemester: "",
  academicHonor2ndSemester: "",
  avgGrade2ndSemester: "",
  majorSubject1stSemester1: "",
  avgGrade1stSemester1: "",
  majorSubject1stSemester2: "",
  avgGrade1stSemester2: "",
  majorSubject2ndSemester1: "",
  avgGrade2ndSemester1: "",
  majorSubject2ndSemester2: "",
  avgGrade2ndSemester2: "",
  // 2nd Year data
  academicHonor1stSemester2ndYear: "",
  avgGrade1stSemester2ndYear: "",
  academicHonor2ndSemester2ndYear: "",
  avgGrade2ndSemester2ndYear: "",
  majorSubject1stSemester1_2ndYear: "",
  avgGrade1stSemester1_2ndYear: "",
  majorSubject1stSemester2_2ndYear: "",
  avgGrade1stSemester2_2ndYear: "",
  majorSubject2ndSemester1_2ndYear: "",
  avgGrade2ndSemester1_2ndYear: "",
  majorSubject2ndSemester2_2ndYear: "",
  avgGrade2ndSemester2_2ndYear: "",
  School: "",
  schoolAddress: "",
  courseAndYearLevel: "",
  studentId: "",
  awards: [
    {
      rankAndName: "",
      description: "",
      awardingBody: "",
      dateAwarded: "",
      level: "",
    },
  ],
};

const StudentInformation: React.FC = () => {
  const navigate = useNavigate();

  // Initialize form data from sessionStorage or use default values
  const [formData, setFormData] = useState<StudentInformationData>(() => {
    try {
      const savedData = sessionStorage.getItem("studentInformation");
      return savedData ? JSON.parse(savedData) : initialFormData;
    } catch (error) {
      console.error("Error parsing session storage data:", error);
      return initialFormData;
    }
  });

  // Add console log effect to track data changes
  useEffect(() => {
    console.log("Form Data Updated:", formData);
    console.log(
      "Session Storage Data:",
      sessionStorage.getItem("studentInformation")
    );
  }, [formData]);

  // Add errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);

  const textareaRef1 = useRef<HTMLTextAreaElement>(null);
  const textareaRef2 = useRef<HTMLTextAreaElement>(null);
  const textareaRef3 = useRef<HTMLTextAreaElement>(null);
  const textareaRef4 = useRef<HTMLTextAreaElement>(null);

  // Create refs outside of useMemo
  const rankAndNameRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const awardingBodyRef = useRef<HTMLTextAreaElement>(null);

  const awardRefs = useMemo(
    () => [
      {
        rankAndName: rankAndNameRef,
        description: descriptionRef,
        awardingBody: awardingBodyRef,
      },
    ],
    [rankAndNameRef, descriptionRef, awardingBodyRef]
  );

  // Save form data to session storage when component unmounts
  useEffect(() => {
    return () => {
      try {
        sessionStorage.setItem("studentInformation", JSON.stringify(formData));
      } catch (error) {
        console.error("Error saving to session storage:", error);
      }
    };
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "studentInformation",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAddAward = () => {
    const updatedFormData = {
      ...formData,
      awards: [
        ...formData.awards,
        {
          rankAndName: "",
          description: "",
          awardingBody: "",
          dateAwarded: "",
          level: "",
        },
      ],
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "studentInformation",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  const handleRemoveAward = (indexToRemove: number) => {
    const updatedFormData = {
      ...formData,
      awards: formData.awards.filter((_, index) => index !== indexToRemove),
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "studentInformation",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  const handleAwardChange = (index: number, field: string, value: string) => {
    const updatedFormData = {
      ...formData,
      awards: formData.awards.map((award, i) =>
        i === index ? { ...award, [field]: value } : award
      ),
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "studentInformation",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  // Auto-resize textareas
  useEffect(() => {
    if (textareaRef1.current) {
      textareaRef1.current.style.height = "auto";
      textareaRef1.current.style.height = `${textareaRef1.current.scrollHeight}px`;
    }
    if (textareaRef2.current) {
      textareaRef2.current.style.height = "auto";
      textareaRef2.current.style.height = `${textareaRef2.current.scrollHeight}px`;
    }
    if (textareaRef3.current) {
      textareaRef3.current.style.height = "auto";
      textareaRef3.current.style.height = `${textareaRef3.current.scrollHeight}px`;
    }
    if (textareaRef4.current) {
      textareaRef4.current.style.height = "auto";
      textareaRef4.current.style.height = `${textareaRef4.current.scrollHeight}px`;
    }
  }, [
    formData.academicHonor1stSemester,
    formData.avgGrade1stSemester,
    formData.academicHonor2ndSemester,
    formData.avgGrade2ndSemester,
  ]);

  // Auto-resize textareas
  useEffect(() => {
    awardRefs.forEach((refs) => {
      Object.values(refs).forEach((ref) => {
        if (ref.current) {
          ref.current.style.height = "auto";
          ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
      });
    });
  }, [formData.awards, awardRefs]);

  // Validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.School.trim()) newErrors.School = "School is required";
    if (!formData.schoolAddress.trim())
      newErrors.schoolAddress = "School address is required";
    if (!formData.courseAndYearLevel.trim())
      newErrors.courseAndYearLevel = "Course and year level is required";
    if (!formData.studentId.trim())
      newErrors.studentId = "Student ID is required";

    // Remove Academic fields validation

    // Award validation - ensure each award is complete or has N/A in all fields
    const awardErrors: string[] = [];

    formData.awards.forEach((award, index) => {
      // Check if all fields are filled or all have "N/A"
      const isNaAward =
        award.rankAndName.trim().toLowerCase() === "n/a" &&
        award.description.trim().toLowerCase() === "n/a" &&
        award.awardingBody.trim().toLowerCase() === "n/a";

      const isCompleteAward =
        award.rankAndName.trim() !== "" &&
        award.description.trim() !== "" &&
        award.awardingBody.trim() !== "" &&
        award.dateAwarded.trim() !== "" &&
        award.level.trim() !== "";

      if (!isNaAward && !isCompleteAward) {
        awardErrors.push(
          `Award #${
            index + 1
          } is incomplete. Complete all fields or use "N/A" for all fields.`
        );
      }
    });

    if (awardErrors.length > 0) {
      newErrors.awards = awardErrors.join("\n");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle navigation to the next page
  const handleNextPage = () => {
    if (validateForm()) {
      try {
        // Store final validated data in sessionStorage
        sessionStorage.setItem("studentInformation", JSON.stringify(formData));
        navigate("/student/studentextracurricularactivities");
      } catch (error) {
        console.error("Error saving to session storage:", error);
        // You might want to show an error message to the user here
      }
    } else {
      setShowErrors(true);
      // Scroll to the first error
      const firstErrorElement = document.querySelector(".error-message");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <main className="flex-1 overflow-y-auto">
        {/* Progress Bar */}
        <ProgressTracker />

        {/* Application Form */}
        <div className="px-20 pt-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">
            Application Form
          </h2>

          {/* Personal Data Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-7 h-7 bg-white border-2 border-blue-600 text-blue-700 text-sm rounded-full">
                <span>3</span>
              </div>
              <span className="ml-2 font-semibold text-blue-700">
                Student Information
              </span>
            </div>

            {/* School Information */}
            <div className="mb-6">
              <label className="block text-blue-700 text-sm font-medium mb-1">
                School Information<span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1">School</div>
                  <input
                    type="text"
                    name="School"
                    value={formData.School}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className={`w-full px-3 py-2 border ${
                      errors.School && showErrors
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  />
                  {errors.School && showErrors && (
                    <p className="text-red-500 text-xs mt-1 error-message">
                      {errors.School}
                    </p>
                  )}
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1">
                    School Address
                  </div>
                  <input
                    type="text"
                    name="schoolAddress"
                    value={formData.schoolAddress}
                    onChange={handleChange}
                    required
                    maxLength={300}
                    className={`w-full px-3 py-2 border ${
                      errors.schoolAddress && showErrors
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  />
                  {errors.schoolAddress && showErrors && (
                    <p className="text-red-500 text-xs mt-1 error-message">
                      {errors.schoolAddress}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Student Details */}
            <div className="mb-6">
              <label className="block text-blue-700 text-sm font-medium mb-1">
                Student Details<span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1">
                    Course and Year Level
                  </div>
                  <select
                    name="courseAndYearLevel"
                    value={formData.courseAndYearLevel}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 border ${
                      errors.courseAndYearLevel && showErrors
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-600`}
                  >
                    <option value="">Select Course and Year Level</option>
                    <option value="2nd Year Bachelor of Science in Information Technology">
                      2nd Year Bachelor of Science in Information Technology
                    </option>
                    <option value="3rd Year Bachelor of Science in Information Technology">
                      3rd Year Bachelor of Science in Information Technology
                    </option>
                    <option value="2nd Year Bachelor of Science in Computer Science">
                      2nd Year Bachelor of Science in Computer Science
                    </option>
                    <option value="3rd Year Bachelor of Science in Computer Science">
                      3rd Year Bachelor of Science in Computer Science
                    </option>
                  </select>
                  {errors.courseAndYearLevel && showErrors && (
                    <p className="text-red-500 text-xs mt-1 error-message">
                      {errors.courseAndYearLevel}
                    </p>
                  )}
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1">Student ID</div>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/\D/g, "");
                      // Update the form directly rather than going through handleChange
                      setFormData((prev) => ({
                        ...prev,
                        studentId: value,
                      }));
                      // Clear error if it exists
                      if (errors.studentId) {
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.studentId;
                          return newErrors;
                        });
                      }
                    }}
                    required
                    maxLength={11}
                    className={`w-full px-3 py-2 border ${
                      errors.studentId && showErrors
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  />
                  {errors.studentId && showErrors && (
                    <p className="text-red-500 text-xs mt-1 error-message">
                      {errors.studentId}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Awards Section with Enhanced UI */}
            <div className="mb-6">
              <label className="block text-blue-700 text-sm font-medium mb-1">
                Awards<span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-1">
                List down significant awards you received in your high school to
                college, arranged from the most recent to earliest.
              </p>
              <div className="mb-4 p-3 bg-blue-50 border border-blue-300 rounded-md">
                <div className="flex items-start">
                  <p className="text-blue-600 text-sm">
                    <span className="font-medium">Important:</span> If you have
                    no awards, enter "N/A" in each field of the first row.
                  </p>
                </div>
              </div>

              {errors.awards && showErrors && (
                <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-md">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2" />
                    <p className="text-red-600 text-sm error-message whitespace-pre-line">
                      {errors.awards}
                    </p>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full border-collapse overflow-hidden">
                  <thead>
                    <tr>
                      <th className="bg-blue-600 text-white p-3 text-center border-r-2 border-white font-satoshi">
                        Rank and Name of Award
                      </th>
                      <th className="bg-blue-600 text-white p-3 text-center border-r-2 border-white font-satoshi">
                        Award Description
                      </th>
                      <th className="bg-blue-600 text-white p-3 text-center border-r-2 border-white font-satoshi">
                        Award-giving Body
                      </th>
                      <th className="bg-blue-600 text-white p-3 text-center border-r-2 border-white font-satoshi">
                        Date Awarded
                      </th>
                      <th className="bg-blue-600 text-white p-3 text-center border-r-2 border-white font-satoshi">
                        Level: Int'l, National, Regional, Division, District,
                        School
                      </th>
                      <th className="bg-blue-600 text-white p-3 text-center w-20 font-satoshi"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Example Row */}
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3 text-sm text-gray-600">
                        <div className="text-xs text-gray-500 mb-1">e.g.</div>
                        2nd place, Feature Writing, National Secondary Schools
                        Press Conference
                      </td>
                      <td className="border border-gray-300 p-3 text-sm text-gray-600">
                        Placed 2nd among all the regional finalists of the press
                        conference
                      </td>
                      <td className="border border-gray-300 p-3 text-sm text-gray-600">
                        Department of Education
                      </td>
                      <td className="border border-gray-300 p-3 text-sm text-gray-600">
                        February 14, 2008
                      </td>
                      <td className="border border-gray-300 p-3 text-sm text-gray-600">
                        National
                      </td>
                      <td className="border border-gray-300 p-3"></td>
                    </tr>

                    {/* Input Row */}
                    {formData.awards.map((award, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-3">
                          <textarea
                            ref={awardRefs[index]?.rankAndName}
                            value={award.rankAndName}
                            onChange={(e) =>
                              handleAwardChange(
                                index,
                                "rankAndName",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-1 focus:outline-none -1 resize-none overflow-hidden text-sm"
                            placeholder="Enter award name"
                            rows={1}
                          />
                        </td>
                        <td className="border border-gray-300 p-3">
                          <textarea
                            ref={awardRefs[index]?.description}
                            value={award.description}
                            onChange={(e) =>
                              handleAwardChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-1 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter description"
                            rows={1}
                          />
                        </td>
                        <td className="border border-gray-300 p-3">
                          <textarea
                            ref={awardRefs[index]?.awardingBody}
                            value={award.awardingBody}
                            onChange={(e) =>
                              handleAwardChange(
                                index,
                                "awardingBody",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-3 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter awarding body"
                            rows={1}
                          />
                        </td>
                        <td className="border border-gray-300 p-3">
                          <input
                            type="text"
                            value={award.dateAwarded}
                            onChange={(e) =>
                              handleAwardChange(
                                index,
                                "dateAwarded",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-1 focus:outline-none text-sm"
                            placeholder="Enter date"
                          />
                        </td>
                        <td className="border border-gray-300 p-3">
                          <select
                            value={award.level}
                            onChange={(e) =>
                              handleAwardChange(index, "level", e.target.value)
                            }
                            className="w-full px-3 py-1 focus:outline-none text-sm text-gray-500"
                          >
                            <option value="">Select Level</option>
                            <option value="N/A">N/A</option>
                            <option value="International">International</option>
                            <option value="National">National</option>
                            <option value="Regional">Regional</option>
                            <option value="Division">Division</option>
                            <option value="District">District</option>
                            <option value="School">School</option>
                          </select>
                        </td>
                        <td className="border border-gray-300 p-3">
                          <button
                            onClick={() => handleRemoveAward(index)}
                            className="flex items-center justify-center w-full p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Remove Award"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* Add Row Button */}
                    <tr>
                      <td colSpan={6} className="border border-gray-300 p-3">
                        <button
                          onClick={handleAddAward}
                          className="flex items-center justify-center w-full py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <CirclePlus className="w-5 h-5 mr-2" />
                          Add Another Award
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Next Page Button */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={() => navigate("/student/studentuploadphoto")}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Back
            </button>
            <button
              onClick={handleNextPage}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Next Page
            </button>
          </div>
        </div>
      </main>
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
    <div className="flex items-center justify-center space-x-15 mb-2 py-6 px-8">
      {steps.map((step, index) => (
        <div key={step.step} className="flex flex-col items-center relative">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-semibold text-sm ${
              step.isActive
                ? "bg-blue-600 text-white border-blue-600"
                : "text-blue-600 border-blue-600"
            }`}
          >
            {step.step}
          </div>
          <span className="text-xs text-blue-600 mt-2">{step.label}</span>
          {index < steps.length - 1 && (
            <div
              className="absolute top-5 left-full w-28 h-px bg-gray-300"
              style={{ marginLeft: "-10px" }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StudentInformation;
