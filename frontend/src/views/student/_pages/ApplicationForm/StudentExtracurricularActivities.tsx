import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CirclePlus, Trash2, Info } from "lucide-react";

interface RefObject {
  current: HTMLTextAreaElement | null;
}

interface ActivityData {
  position: string;
  organizations: string;
  significantContribution: string;
  inclusiveYears: string;
  level: string;
}

interface CommunityActivityData {
  activity: string;
  description: string;
  role: string;
  inclusiveDates: string;
}

interface ExtracurricularFormData {
  activities: ActivityData[];
  communityActivities: CommunityActivityData[];
}

const initialFormData: ExtracurricularFormData = {
  activities: [
    {
      position: "",
      organizations: "",
      significantContribution: "",
      inclusiveYears: "",
      level: "",
    },
  ],
  communityActivities: [
    {
      activity: "",
      description: "",
      role: "",
      inclusiveDates: "",
    },
  ],
};

const StudentExtraCurricularActivities: React.FC = () => {
  const navigate = useNavigate();

  // Initialize form data from sessionStorage or use default values
  const [formData, setFormData] = useState<ExtracurricularFormData>(() => {
    try {
      const savedData = sessionStorage.getItem("extracurricularActivities");
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
      sessionStorage.getItem("extracurricularActivities")
    );
  }, [formData]);

  // Create refs for activities
  const [activityRefs] = useState<Array<{ [key: string]: RefObject }>>(() => [
    {
      position: { current: null },
      organizations: { current: null },
      significantContribution: { current: null },
    },
  ]);

  // Create refs for community activities
  const [communityRefs, setCommunityRefs] = useState<
    Array<{ [key: string]: RefObject }>
  >(() => [
    {
      activity: { current: null },
      description: { current: null },
      role: { current: null },
    },
  ]);

  // Save form data to session storage when component unmounts
  useEffect(() => {
    return () => {
      try {
        sessionStorage.setItem(
          "extracurricularActivities",
          JSON.stringify(formData)
        );
      } catch (error) {
        console.error("Error saving to session storage:", error);
      }
    };
  }, [formData]);

  // Update refs when community activities change
  useEffect(() => {
    if (formData.communityActivities.length > communityRefs.length) {
      setCommunityRefs((prevRefs) => {
        const newRefs = [...prevRefs];
        for (
          let i = prevRefs.length;
          i < formData.communityActivities.length;
          i++
        ) {
          newRefs.push({
            activity: { current: null },
            description: { current: null },
            role: { current: null },
          });
        }
        return newRefs;
      });
    }
  }, [formData.communityActivities.length, communityRefs.length]);

  const handleChange = (index: number, field: string, value: string) => {
    const updatedFormData = {
      ...formData,
      activities: formData.activities.map((activity, i) =>
        i === index ? { ...activity, [field]: value } : activity
      ),
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "extracurricularActivities",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  const handleAddActivity = () => {
    const updatedFormData = {
      ...formData,
      activities: [
        ...formData.activities,
        {
          position: "",
          organizations: "",
          significantContribution: "",
          inclusiveYears: "",
          level: "",
        },
      ],
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "extracurricularActivities",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  const handleRemoveActivity = (indexToRemove: number) => {
    const updatedFormData = {
      ...formData,
      activities: formData.activities.filter(
        (_, index) => index !== indexToRemove
      ),
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "extracurricularActivities",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  // Community Activities handlers
  const handleCommunityChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedFormData = {
      ...formData,
      communityActivities: formData.communityActivities.map((activity, i) =>
        i === index ? { ...activity, [field]: value } : activity
      ),
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "extracurricularActivities",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  const handleAddCommunityActivity = () => {
    const updatedFormData = {
      ...formData,
      communityActivities: [
        ...formData.communityActivities,
        {
          activity: "",
          description: "",
          role: "",
          inclusiveDates: "",
        },
      ],
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "extracurricularActivities",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  const handleRemoveCommunityActivity = (indexToRemove: number) => {
    const updatedFormData = {
      ...formData,
      communityActivities: formData.communityActivities.filter(
        (_, index) => index !== indexToRemove
      ),
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    try {
      sessionStorage.setItem(
        "extracurricularActivities",
        JSON.stringify(updatedFormData)
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  // Auto-resize textareas
  useEffect(() => {
    activityRefs.forEach((refs) => {
      Object.values(refs).forEach((ref) => {
        if (ref.current) {
          ref.current.style.height = "auto";
          ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
      });
    });
  }, [formData.activities, activityRefs]);

  // Auto-resize community activity textareas
  useEffect(() => {
    communityRefs.forEach((refs) => {
      Object.values(refs).forEach((ref) => {
        if (ref.current) {
          ref.current.style.height = "auto";
          ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
      });
    });
  }, [formData.communityActivities, communityRefs]);

  // Validate form before navigating
  const handleNextPage = () => {
    // Check if all fields have values or N/A
    const isActivitiesValid = formData.activities.every(
      (activity) =>
        activity.position.trim() !== "" &&
        activity.organizations.trim() !== "" &&
        activity.significantContribution.trim() !== "" &&
        activity.inclusiveYears.trim() !== "" &&
        activity.level.trim() !== ""
    );

    const isCommunityActivitiesValid = formData.communityActivities.every(
      (activity) =>
        activity.activity.trim() !== "" &&
        activity.description.trim() !== "" &&
        activity.role.trim() !== "" &&
        activity.inclusiveDates.trim() !== ""
    );

    if (isActivitiesValid && isCommunityActivitiesValid) {
      try {
        // Store final validated data in sessionStorage
        sessionStorage.setItem(
          "extracurricularActivities",
          JSON.stringify(formData)
        );
        navigate("/student/studentfamilyreference");
      } catch (error) {
        console.error("Error saving to session storage:", error);
        // You might want to show an error message to the user here
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      alert(
        "Please fill in all required fields. If you have no activities, enter 'N/A' in each field."
      );
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 overflow-y-auto">
        {/* Progress Bar */}
        <ProgressTracker />

        {/* Application Form */}
        <div className="px-20 pt-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">
            Application Form
          </h2>

          {/* Extra/Co-Curricular Activities Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-7 h-7 bg-white border-2 border-blue-600 text-blue-700 text-sm rounded-full">
                <span>3</span>
              </div>
              <span className="ml-2 font-semibold text-blue-700">
                Extra / Co-Curricular Activities
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Position of leadership in school community and/or civic
              organizations.
            </p>

            {/* Information box */}
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center text-blue-700">
                <Info className="w-5 h-5 mr-2" />
                <span className="text-sm">
                  Important: If you have no activities, enter "N/A" in each
                  field of the first row.
                </span>
              </div>
            </div>

            {/* Activities Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse overflow-hidden">
                <thead>
                  <tr>
                    <th className="bg-blue-600 text-white p-3 text-center border-r-2 border-white font-satoshi">
                      Position
                    </th>
                    <th className="bg-blue-600 text-white p-3 text-center border-r-2 border-white font-satoshi">
                      Organizations
                    </th>
                    <th className="bg-blue-600 text-white p-3 text-center border-r-2 border-white font-satoshi">
                      Significant Contribution
                    </th>
                    <th className="bg-blue-600 text-white p-3 text-center border-r-2 border-white font-satoshi">
                      Inclusive Years
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
                      President
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-gray-600">
                      Regional Federation of Junior Philippine Accountants
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-gray-600">
                      Implemented Projects
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-gray-600">
                      February 14, 2008
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-gray-600">
                      National
                    </td>
                    <td className="border border-gray-300 p-3"></td>
                  </tr>

                  {/* Input Rows */}
                  {formData.activities.map((activity, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-3">
                        <textarea
                          ref={activityRefs[index]?.position}
                          value={activity.position}
                          onChange={(e) =>
                            handleChange(index, "position", e.target.value)
                          }
                          className="w-full px-3 py-2 focus:outline-none resize-none overflow-hidden text-sm"
                          placeholder="Enter position"
                          rows={1}
                          required
                        />
                      </td>
                      <td className="border border-gray-300 p-3">
                        <textarea
                          ref={activityRefs[index]?.organizations}
                          value={activity.organizations}
                          onChange={(e) =>
                            handleChange(index, "organizations", e.target.value)
                          }
                          className="w-full px-3 py-2 focus:outline-none resize-none overflow-hidden text-sm"
                          placeholder="Enter organization"
                          rows={1}
                          required
                        />
                      </td>
                      <td className="border border-gray-300 p-3">
                        <textarea
                          ref={activityRefs[index]?.significantContribution}
                          value={activity.significantContribution}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "significantContribution",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-5 focus:outline-none resize-none overflow-hidden text-sm"
                          placeholder="Enter contribution"
                          rows={1}
                          required
                        />
                      </td>
                      <td className="border border-gray-300 p-3">
                        <input
                          type="text"
                          value={activity.inclusiveYears}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "inclusiveYears",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-1 focus:outline-none text-sm text-gray-500"
                          placeholder="Enter date"
                          required
                        />
                      </td>
                      <td className="border border-gray-300 p-3">
                        <select
                          value={activity.level}
                          onChange={(e) =>
                            handleChange(index, "level", e.target.value)
                          }
                          className="w-full px-3 py-1 focus:outline-none text-sm text-gray-500"
                          required
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
                          onClick={() => handleRemoveActivity(index)}
                          className="flex items-center justify-center w-full p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Remove Activity"
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
                        onClick={handleAddActivity}
                        className="flex items-center justify-center w-full py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <CirclePlus className="w-5 h-5 mr-2" />
                        Add Another Activity
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Community Involvement Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-7 h-7 bg-white border-2 border-blue-600 text-blue-700 text-sm rounded-full">
                <span>4</span>
              </div>
              <span className="ml-2 font-semibold text-blue-700">
                Community Involvement
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Participation in projects in the community and/or civic movements.
            </p>

            {/* Information box */}
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center text-blue-700">
                <Info className="w-5 h-5 mr-2" />
                <span className="text-sm">
                  Important: If you have no community activities, enter "N/A" in
                  each field of the first row.
                </span>
              </div>
            </div>

            {/* Community Activities Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse overflow-hidden">
                <thead>
                  <tr>
                    <th className="bg-blue-600 text-white p-3 text-center border-r-2 border-white font-satoshi">
                      Community Activities
                    </th>
                    <th className="bg-blue-600 text-white p-3 text-center border-r-2 border-white font-satoshi">
                      Activity Description
                    </th>
                    <th className="bg-blue-600 text-white p-3 text-center border-r-2 border-white font-satoshi">
                      Role
                    </th>
                    <th className="bg-blue-600 text-white p-3 text-center border-r-2 border-white font-satoshi">
                      Inclusive Dates
                    </th>
                    <th className="bg-blue-600 text-white p-3 text-center w-20 font-satoshi"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example Row */}
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 text-sm text-gray-600">
                      <div className="text-xs text-gray-500 mb-1">e.g.</div>
                      Brigada- Eskwela
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-gray-600">
                      Painted Chairs and tables for Banilad Night High School
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-gray-600">
                      Volunteer
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-gray-600">
                      May 22-23, 2009
                    </td>
                    <td className="border border-gray-300 p-3"></td>
                  </tr>

                  {/* Input Rows */}
                  {formData.communityActivities.map((activity, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-3">
                        <textarea
                          ref={communityRefs[index]?.activity}
                          value={activity.activity}
                          onChange={(e) =>
                            handleCommunityChange(
                              index,
                              "activity",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-4 focus:outline-none resize-none overflow-hidden text-sm"
                          placeholder="Enter community activity"
                          rows={1}
                          required
                        />
                      </td>
                      <td className="border border-gray-300 p-3">
                        <textarea
                          ref={communityRefs[index]?.description}
                          value={activity.description}
                          onChange={(e) =>
                            handleCommunityChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-1 focus:outline-none resize-none overflow-hidden text-sm"
                          placeholder="Enter activity description"
                          rows={1}
                          required
                        />
                      </td>
                      <td className="border border-gray-300 p-3">
                        <textarea
                          ref={communityRefs[index]?.role}
                          value={activity.role}
                          onChange={(e) =>
                            handleCommunityChange(index, "role", e.target.value)
                          }
                          className="w-full px-3 py-2 focus:outline-none resize-none overflow-hidden text-sm"
                          placeholder="Enter role"
                          rows={1}
                          required
                        />
                      </td>
                      <td className="border border-gray-300 p-3">
                        <input
                          type="text"
                          value={activity.inclusiveDates}
                          onChange={(e) =>
                            handleCommunityChange(
                              index,
                              "inclusiveDates",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-1 focus:outline-none text-sm"
                          placeholder="Enter inclusive dates"
                          required
                        />
                      </td>
                      <td className="border border-gray-300 p-3">
                        <button
                          onClick={() => handleRemoveCommunityActivity(index)}
                          className="flex items-center justify-center w-full p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Remove Activity"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Add Row Button */}
                  <tr>
                    <td colSpan={5} className="border border-gray-300 p-3">
                      <button
                        onClick={handleAddCommunityActivity}
                        className="flex items-center justify-center w-full py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <CirclePlus className="w-5 h-5 mr-2" />
                        Add Another Activity
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end space-x-4 mt-4 mb-6">
            <button
              onClick={() => navigate("/student/studentinformation")}
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
      </div>
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

export default StudentExtraCurricularActivities;
