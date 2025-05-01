import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CirclePlus, Trash2, Info } from "lucide-react";

interface ParentData {
  fullName: string;
  age: string;
  relation: string;
  occupationLivelihood: string;
  presentEmploymentAddress: string;
  designationPosition: string;
  grossAnnualIncome: string;
}

interface StudyingSiblingData {
  fullName: string;
  schoolNameAddress: string;
  courseYearLevel: string;
  scholarshipPrivilege: string;
  scholarshipName: string;
  amount: string;
}

interface NotStudyingSiblingData {
  fullName: string;
  civilStatus: string;
  educationalAttainment: string;
  occupationLivelihood: string;
  presentEmployment: string;
  designationPosition: string;
  grossAnnualIncome: string;
}

interface FamilyReferenceFormData {
  parents: ParentData[];
  studyingSiblings: StudyingSiblingData[];
  notStudyingSiblings: NotStudyingSiblingData[];
}

const initialFormData: FamilyReferenceFormData = {
  parents: [
    {
      fullName: "",
      age: "",
      relation: "",
      occupationLivelihood: "",
      presentEmploymentAddress: "",
      designationPosition: "",
      grossAnnualIncome: "",
    },
  ],
  studyingSiblings: [
    {
      fullName: "",
      schoolNameAddress: "",
      courseYearLevel: "",
      scholarshipPrivilege: "",
      scholarshipName: "",
      amount: "",
    },
  ],
  notStudyingSiblings: [
    {
      fullName: "",
      civilStatus: "",
      educationalAttainment: "",
      occupationLivelihood: "",
      presentEmployment: "",
      designationPosition: "",
      grossAnnualIncome: "",
    },
  ],
};

const StudentFamilyReference: React.FC = () => {
  const navigate = useNavigate();

  // Initialize form data from sessionStorage or use default values
  const [formData, setFormData] = useState<FamilyReferenceFormData>(() => {
    try {
      const savedData = sessionStorage.getItem("familyReference");
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
      sessionStorage.getItem("familyReference")
    );
  }, [formData]);

  // Save form data to session storage when component unmounts
  useEffect(() => {
    return () => {
      try {
        sessionStorage.setItem("familyReference", JSON.stringify(formData));
      } catch (error) {
        console.error("Error saving to session storage:", error);
      }
    };
  }, [formData]);

  // Handle changes for parents section
  const handleParentChange = (index: number, field: string, value: string) => {
    const updatedFormData = {
      ...formData,
      parents: formData.parents.map((parent, i) =>
        i === index ? { ...parent, [field]: value } : parent
      ),
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "familyReference",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  // Handle changes for studying siblings section
  const handleStudyingSiblingChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedFormData = {
      ...formData,
      studyingSiblings: formData.studyingSiblings.map((sibling, i) =>
        i === index ? { ...sibling, [field]: value } : sibling
      ),
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "familyReference",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  // Handle changes for not studying siblings section
  const handleNotStudyingSiblingChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedFormData = {
      ...formData,
      notStudyingSiblings: formData.notStudyingSiblings.map((sibling, i) =>
        i === index ? { ...sibling, [field]: value } : sibling
      ),
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "familyReference",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  // Add row functions
  const handleAddParent = () => {
    const updatedFormData = {
      ...formData,
      parents: [
        ...formData.parents,
        {
          fullName: "",
          age: "",
          relation: "",
          occupationLivelihood: "",
          presentEmploymentAddress: "",
          designationPosition: "",
          grossAnnualIncome: "",
        },
      ],
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "familyReference",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  const handleAddStudyingSibling = () => {
    const updatedFormData = {
      ...formData,
      studyingSiblings: [
        ...formData.studyingSiblings,
        {
          fullName: "",
          schoolNameAddress: "",
          courseYearLevel: "",
          scholarshipPrivilege: "",
          scholarshipName: "",
          amount: "",
        },
      ],
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "familyReference",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  const handleAddNotStudyingSibling = () => {
    const updatedFormData = {
      ...formData,
      notStudyingSiblings: [
        ...formData.notStudyingSiblings,
        {
          fullName: "",
          civilStatus: "",
          educationalAttainment: "",
          occupationLivelihood: "",
          presentEmployment: "",
          designationPosition: "",
          grossAnnualIncome: "",
        },
      ],
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "familyReference",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  // Remove row functions
  const handleRemoveParent = (indexToRemove: number) => {
    const updatedFormData = {
      ...formData,
      parents: formData.parents.filter((_, index) => index !== indexToRemove),
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "familyReference",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  const handleRemoveStudyingSibling = (indexToRemove: number) => {
    const updatedFormData = {
      ...formData,
      studyingSiblings: formData.studyingSiblings.filter(
        (_, index) => index !== indexToRemove
      ),
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "familyReference",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  const handleRemoveNotStudyingSibling = (indexToRemove: number) => {
    const updatedFormData = {
      ...formData,
      notStudyingSiblings: formData.notStudyingSiblings.filter(
        (_, index) => index !== indexToRemove
      ),
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "familyReference",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  // Validate form before navigating
  const handleNextPage = () => {
    // Check if at least first row of parents has values
    const isParentsValid =
      formData.parents.length > 0 &&
      formData.parents.every(
        (parent) =>
          parent.fullName.trim() !== "" &&
          parent.age.trim() !== "" &&
          parent.relation.trim() !== "" &&
          parent.occupationLivelihood.trim() !== "" &&
          parent.presentEmploymentAddress.trim() !== "" &&
          parent.designationPosition.trim() !== "" &&
          parent.grossAnnualIncome.trim() !== ""
      );

    // Check if at least first row of studying siblings has values
    const isStudyingSiblingsValid =
      formData.studyingSiblings.length > 0 &&
      formData.studyingSiblings.every(
        (sibling) =>
          sibling.fullName.trim() !== "" &&
          sibling.schoolNameAddress.trim() !== "" &&
          sibling.courseYearLevel.trim() !== "" &&
          sibling.scholarshipPrivilege.trim() !== "" &&
          sibling.scholarshipName.trim() !== "" &&
          sibling.amount.trim() !== ""
      );

    // Check if at least first row of not studying siblings has values
    const isNotStudyingSiblingsValid =
      formData.notStudyingSiblings.length > 0 &&
      formData.notStudyingSiblings.every(
        (sibling) =>
          sibling.fullName.trim() !== "" &&
          sibling.civilStatus.trim() !== "" &&
          sibling.educationalAttainment.trim() !== "" &&
          sibling.occupationLivelihood.trim() !== "" &&
          sibling.presentEmployment.trim() !== "" &&
          sibling.designationPosition.trim() !== "" &&
          sibling.grossAnnualIncome.trim() !== ""
      );

    if (
      isParentsValid &&
      isStudyingSiblingsValid &&
      isNotStudyingSiblingsValid
    ) {
      try {
        // Store final validated data in sessionStorage
        sessionStorage.setItem("familyReference", JSON.stringify(formData));
        navigate("/student/studenttermsandconditions");
      } catch (error) {
        console.error("Error saving to session storage:", error);
        // You might want to show an error message to the user here
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      alert(
        "Please fill in all required fields. If you have no information to provide, enter 'N/A' in each field."
      );
    }
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

          {/* Family Reference Section */}
          <div className="mb-8 max-w-[95%] mx-auto">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-7 h-7 bg-white border-2 border-blue-600 text-blue-700 text-sm rounded-full">
                <span>4</span>
              </div>
              <span className="ml-2 font-semibold text-blue-700">
                Family Reference
              </span>
            </div>

            {/* Information box */}
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center text-blue-700">
                <Info className="w-5 h-5 mr-2" />
                <span className="text-sm">
                  Important: If you have no information to provide, enter "N/A"
                  in each field of the respective section.
                </span>
              </div>
            </div>

            {/* Parents Section */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-blue-700 mb-4">
                A. Parents
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse overflow-hidden">
                  <thead>
                    <tr>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[20%]">
                        Full Name
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[8%]">
                        Age
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[10%]">
                        Relation
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[15%]">
                        Occupation/ Livelihood
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[20%]">
                        Present Employment / Address
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[15%]">
                        Designation Position
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[12%]">
                        Gross Annual Income
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center w-[5%]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.parents.map((parent, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={parent.fullName}
                            onChange={(e) =>
                              handleParentChange(
                                index,
                                "fullName",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-2 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter full name"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={parent.age}
                            onChange={(e) =>
                              handleParentChange(index, "age", e.target.value)
                            }
                            className="w-full px-2 py-2 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Age"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={parent.relation}
                            onChange={(e) =>
                              handleParentChange(
                                index,
                                "relation",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-2 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Relation"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={parent.occupationLivelihood}
                            onChange={(e) =>
                              handleParentChange(
                                index,
                                "occupationLivelihood",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-2 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter occupation"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={parent.presentEmploymentAddress}
                            onChange={(e) =>
                              handleParentChange(
                                index,
                                "presentEmploymentAddress",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-2 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter employment/address"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={parent.designationPosition}
                            onChange={(e) =>
                              handleParentChange(
                                index,
                                "designationPosition",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-4 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter designation"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={parent.grossAnnualIncome}
                            onChange={(e) =>
                              handleParentChange(
                                index,
                                "grossAnnualIncome",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-2 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter income"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <button
                            onClick={() => handleRemoveParent(index)}
                            className="flex items-center justify-center w-full p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Remove Parent"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={8} className="border border-gray-300 p-2">
                        <button
                          onClick={handleAddParent}
                          className="flex items-center justify-center w-full py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <CirclePlus className="w-5 h-5 mr-2" />
                          Add Parent
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Studying Siblings Section */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-blue-700 mb-4">
                B. Brothers / Sisters STILL STUDYING
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse overflow-hidden">
                  <thead>
                    <tr>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[20%]">
                        Full Name of Brothers / Sisters
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[20%]">
                        Name and Address of School
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[15%]">
                        Course and Year Level
                      </th>
                      <th
                        className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[35%]"
                        colSpan={2}
                      >
                        Scholarship availed, if there is any
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="text-center text-sm">
                            Privilege (Full/Partial)
                          </div>
                          <div className="text-center text-sm">
                            Name of Scholarship
                          </div>
                        </div>
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[10%]">
                        Amount
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center w-[5%]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.studyingSiblings.map((sibling, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={sibling.fullName}
                            onChange={(e) =>
                              handleStudyingSiblingChange(
                                index,
                                "fullName",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-2 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter full name"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={sibling.schoolNameAddress}
                            onChange={(e) =>
                              handleStudyingSiblingChange(
                                index,
                                "schoolNameAddress",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-4 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter school name and address"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={sibling.courseYearLevel}
                            onChange={(e) =>
                              handleStudyingSiblingChange(
                                index,
                                "courseYearLevel",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-2 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter course and year level"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={sibling.scholarshipPrivilege}
                            onChange={(e) =>
                              handleStudyingSiblingChange(
                                index,
                                "scholarshipPrivilege",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-2 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter privilege"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={sibling.scholarshipName}
                            onChange={(e) =>
                              handleStudyingSiblingChange(
                                index,
                                "scholarshipName",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-5 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter scholarship name"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={sibling.amount}
                            onChange={(e) =>
                              handleStudyingSiblingChange(
                                index,
                                "amount",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-6 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter amount"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <button
                            onClick={() => handleRemoveStudyingSibling(index)}
                            className="flex items-center justify-center w-full p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Remove Sibling"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={7} className="border border-gray-300 p-2">
                        <button
                          onClick={handleAddStudyingSibling}
                          className="flex items-center justify-center w-full py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <CirclePlus className="w-5 h-5 mr-2" />
                          Add Studying Sibling
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Not Studying Siblings Section */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-blue-700 mb-4">
                C. Brothers/Sisters NOT or NO LONGER STUDYING
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse overflow-hidden">
                  <thead>
                    <tr>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[20%]">
                        Full Name of Brothers / Sisters
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[10%]">
                        Civil Status
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[15%]">
                        Educational Attainment
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[15%]">
                        Occupation/ Livelihood
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[15%]">
                        Present Employment
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[15%]">
                        Designation Position
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center border-r-2 border-white w-[10%]">
                        Gross Annual Income
                      </th>
                      <th className="bg-blue-600 text-white p-2 text-center w-[5%]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.notStudyingSiblings.map((sibling, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={sibling.fullName}
                            onChange={(e) =>
                              handleNotStudyingSiblingChange(
                                index,
                                "fullName",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-2 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter full name"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <div className="relative">
                            <select
                              value={sibling.civilStatus}
                              onChange={(e) =>
                                handleNotStudyingSiblingChange(
                                  index,
                                  "civilStatus",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1 focus:outline-none text-sm text-gray-500 bg-white border-0 appearance-none cursor-pointer pr-8"
                              required
                            >
                              <option value="" className="text-gray-500">
                                Status
                              </option>
                              <option value="N/A">N/A</option>
                              <option value="Single">Single</option>
                              <option value="Married">Married</option>
                              <option value="Widowed">Widowed</option>
                              <option value="Separated">Separated</option>
                              <option value="Divorced">Divorced</option>
                            </select>
                          </div>
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={sibling.educationalAttainment}
                            onChange={(e) =>
                              handleNotStudyingSiblingChange(
                                index,
                                "educationalAttainment",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-3 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter educational attainment"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={sibling.occupationLivelihood}
                            onChange={(e) =>
                              handleNotStudyingSiblingChange(
                                index,
                                "occupationLivelihood",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter occupation"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={sibling.presentEmployment}
                            onChange={(e) =>
                              handleNotStudyingSiblingChange(
                                index,
                                "presentEmployment",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter present employment"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={sibling.designationPosition}
                            onChange={(e) =>
                              handleNotStudyingSiblingChange(
                                index,
                                "designationPosition",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter designation"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={sibling.grossAnnualIncome}
                            onChange={(e) =>
                              handleNotStudyingSiblingChange(
                                index,
                                "grossAnnualIncome",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 focus:outline-none resize-none overflow-hidden text-sm"
                            placeholder="Enter income"
                            rows={1}
                            required
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <button
                            onClick={() =>
                              handleRemoveNotStudyingSibling(index)
                            }
                            className="flex items-center justify-center w-full p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Remove Sibling"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={8} className="border border-gray-300 p-2">
                        <button
                          onClick={handleAddNotStudyingSibling}
                          className="flex items-center justify-center w-full py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <CirclePlus className="w-5 h-5 mr-2" />
                          Add Non-Studying Sibling
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end space-x-4 mt-4 mb-6">
            <button
              onClick={() =>
                navigate("/student/studentextracurricularactivities")
              }
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

export default StudentFamilyReference;
