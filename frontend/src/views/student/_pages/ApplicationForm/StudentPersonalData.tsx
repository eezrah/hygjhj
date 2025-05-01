import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StudentFormData {
  [key: string]: string | undefined;
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

const initialFormData: StudentFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  nickname: "",
  landline: "",
  mobileNumber: "",
  homeAddress: "",
  dateOfBirth: "",
  age: "",
  gender: "",
  citizenship: "",
  civilStatus: "",
  religion: "",
  customSuffix: "",
};

const debugSessionStorage = () => {
  try {
    const data = sessionStorage.getItem("personalData");
    console.log(
      "Current Personal Data in Session Storage:",
      data ? JSON.parse(data) : null
    );
  } catch (error) {
    console.error("Error reading session storage:", error);
  }
};

const StudentPersonalData: React.FC = () => {
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  // Initialize form data from sessionStorage or use default values
  const [formData, setFormData] = useState<StudentFormData>(() => {
    try {
      const savedData = sessionStorage.getItem("personalData");
      return savedData ? JSON.parse(savedData) : initialFormData;
    } catch (error) {
      console.error("Error parsing session storage data:", error);
      return initialFormData;
    }
  });

  // Date picker state
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const datepickerRef = useRef<HTMLDivElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Save form data to session storage when component unmounts
  useEffect(() => {
    return () => {
      sessionStorage.setItem("personalData", JSON.stringify(formData));
    };
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const updatedFormData = { ...formData };

    // Apply formatting for phone numbers
    if (name === "landline") {
      updatedFormData[name] = formatLandline(value);
    } else if (name === "mobileNumber") {
      updatedFormData[name] = formatMobileNumber(value);
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
    // Store in sessionStorage
    sessionStorage.setItem("personalData", JSON.stringify(updatedFormData));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);

    // Format date as YYYY-MM-DD for form data
    const formattedDate = newDate.toISOString().split("T")[0];

    // Calculate age
    const today = new Date();
    let age = today.getFullYear() - newDate.getFullYear();
    const monthDiff = today.getMonth() - newDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < newDate.getDate())
    ) {
      age--;
    }

    const updatedFormData = {
      ...formData,
      dateOfBirth: formattedDate,
      age: age.toString(),
    };

    setFormData(updatedFormData);
    // Store in sessionStorage
    sessionStorage.setItem("personalData", JSON.stringify(updatedFormData));

    // Clear date error
    if (errors.dateOfBirth) {
      setErrors((prev) => ({
        ...prev,
        dateOfBirth: "",
      }));
    }

    setShowDatepicker(false);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    const days: React.ReactNode[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-xs h-7 w-7"></div>);
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected =
        selectedDate &&
        i === selectedDate.getDate() &&
        currentMonth === selectedDate.getMonth() &&
        currentYear === selectedDate.getFullYear();

      days.push(
        <button
          key={i}
          className={`text-xs rounded-full h-7 w-7 flex items-center justify-center hover:bg-blue-100 ${
            isSelected ? "bg-blue-500 text-white" : "text-gray-700"
          }`}
          onClick={() => handleDateSelect(i)}
        >
          {i}
        </button>
      );
    }

    return days;
  };

  // Format landline number as 02-8123-4567
  const formatLandline = (value: string): string => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Limit to max 12 digits
    const truncated = digits.slice(0, 12);

    // Format as XX-XXXX-XXXX
    if (truncated.length <= 2) {
      return truncated;
    } else if (truncated.length <= 6) {
      return `${truncated.slice(0, 2)}-${truncated.slice(2)}`;
    } else {
      return `${truncated.slice(0, 2)}-${truncated.slice(
        2,
        6
      )}-${truncated.slice(6)}`;
    }
  };

  // Format mobile number as +63 921 836 5045
  const formatMobileNumber = (value: string): string => {
    // Remove all non-digit characters except for the leading +
    const cleaned = value.replace(/(?!^\+)\D/g, "").replace(/^(?!\+)/, "+");

    // Get all digits (remove +)
    const digits = cleaned.replace(/\D/g, "");

    // Prepend +63 if not already there
    let formatted;
    if (cleaned.startsWith("+")) {
      // If user is typing a country code, preserve it
      formatted = `+${digits.slice(0, 14)}`;
    } else {
      // Default to +63 format
      formatted = `+63${digits.slice(0, 10)}`;
    }

    // Limit to max 16 characters total (including + and spaces)
    // For the format "+63 921 836 5045" with spaces

    // Format with spaces
    if (formatted.startsWith("+63") && formatted.length > 3) {
      const nationalNumber = formatted.slice(3);
      if (nationalNumber.length <= 3) {
        return `+63 ${nationalNumber}`;
      } else if (nationalNumber.length <= 6) {
        return `+63 ${nationalNumber.slice(0, 3)} ${nationalNumber.slice(3)}`;
      } else if (nationalNumber.length <= 10) {
        return `+63 ${nationalNumber.slice(0, 3)} ${nationalNumber.slice(
          3,
          6
        )} ${nationalNumber.slice(6)}`;
      }
    }

    return formatted;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    const requiredFields = [
      "firstName",
      "lastName",
      "mobileNumber",
      "homeAddress",
      "dateOfBirth",
      "age",
      "gender",
      "citizenship",
      "civilStatus",
      "religion",
      "nickname",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = "This field is required";
      }
    });

    // If suffix is "Other" but no custom suffix provided
    if (formData.suffix === "Other" && !formData.customSuffix) {
      newErrors.customSuffix = "Please specify suffix";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      try {
        // Store final validated data in sessionStorage
        sessionStorage.setItem("personalData", JSON.stringify(formData));
        // Navigate to next page
        navigate("/student/studentuploadphoto");
      } catch (error) {
        console.error("Error saving form data to session storage:", error);
        // You might want to show an error message to the user here
      }
    }
  };

  // Format date for display (example: April 2, 2025)
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "Select date";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Add this effect to log data changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    console.log("Form Data Updated:", formData);
    console.log(
      "Session Storage Data:",
      sessionStorage.getItem("personalData")
    );
  }, [formData]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-white to-blue-50">
      <main className="flex-1 overflow-y-auto">
        {/* Add Debug Button - Only visible in development */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-4 left-4 z-50">
            <button
              onClick={debugSessionStorage}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              Debug Storage
            </button>
          </div>
        )}

        {/* Progress Bar - Original, unchanged */}
        <ProgressTracker />

        {/* Application Form */}
        <div className="px-20 pt-6 pb-10">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-8 flex items-center">
              <span className="bg-blue-100 rounded-lg p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </span>
              Application Form
            </h2>

            {/* Personal Data Section */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl border border-blue-100 p-6">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white text-lg font-semibold rounded-full">
                    1
                  </div>
                  <span className="ml-3 text-lg font-semibold text-blue-800">
                    Personal Data
                  </span>
                </div>

                {/* Name Information Section */}
                <div className="mb-8">
                  <label className="block text-blue-800 text-sm font-semibold mb-3">
                    Name Information
                  </label>
                  <div className="grid grid-cols-5 gap-6">
                    {/* First Name */}
                    <div className="bg-white rounded-lg shadow-sm border border-blue-50 p-3 transition duration-300 hover:shadow-md">
                      <div className="text-xs font-medium text-blue-600 mb-1">
                        First Name
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
                        placeholder="Enter first name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    {/* Middle Name */}
                    <div className="bg-white rounded-lg shadow-sm border border-blue-50 p-3 transition duration-300 hover:shadow-md">
                      <div className="text-xs font-medium text-blue-600 mb-1">
                        Middle Name
                      </div>
                      <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
                        placeholder="Enter middle name"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="bg-white rounded-lg shadow-sm border border-blue-50 p-3 transition duration-300 hover:shadow-md">
                      <div className="text-xs font-medium text-blue-600 mb-1">
                        Last Name
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
                        placeholder="Enter last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    {/* Suffix */}
                    <div className="bg-white rounded-lg shadow-sm border border-blue-50 p-3 transition duration-300 hover:shadow-md">
                      <div className="text-xs font-medium text-blue-600 mb-1">
                        Suffix
                      </div>
                      <select
                        name="suffix"
                        value={formData.suffix}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
                      >
                        <option value="">Select Suffix</option>
                        <option value="Jr.">Jr.</option>
                        <option value="Sr.">Sr.</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                        <option value="Other">Other</option>
                      </select>
                      {formData.suffix === "Other" && (
                        <input
                          type="text"
                          name="customSuffix"
                          value={formData.customSuffix}
                          onChange={handleChange}
                          placeholder="Specify suffix"
                          className="w-full px-3 py-2 mt-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
                        />
                      )}
                    </div>

                    {/* Nickname */}
                    <div className="bg-white rounded-lg shadow-sm border border-blue-50 p-3 transition duration-300 hover:shadow-md">
                      <div className="text-xs font-medium text-blue-600 mb-1">
                        Nickname
                      </div>
                      <input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        maxLength={50}
                        required
                        className="w-full px-3 py-2.5 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700 placeholder-gray-400"
                        placeholder="Enter nickname"
                      />
                      {errors.nickname && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.nickname}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-8">
                  <label className="block text-blue-800 text-sm font-semibold mb-3">
                    Contact Information
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-blue-50 p-3 transition duration-300 hover:shadow-md">
                      <div className="text-xs font-medium text-blue-600 mb-1">
                        Landline (Optional)
                      </div>
                      <input
                        type="text"
                        name="landline"
                        value={formData.landline}
                        onChange={handleChange}
                        placeholder="02-8123-4567"
                        maxLength={12}
                        className="w-full px-3 py-2.5 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-blue-50 p-3 transition duration-300 hover:shadow-md">
                      <div className="text-xs font-medium text-blue-600 mb-1">
                        Mobile Number
                      </div>
                      <input
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
                        placeholder="+63 XXX XXX XXXX"
                      />
                      {errors.mobileNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.mobileNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="mb-6">
                  <label className="block text-blue-700 text-sm font-medium mb-1">
                    Address<span className="text-red-500">*</span>
                  </label>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">
                      Home Address
                    </div>
                    <input
                      type="text"
                      name="homeAddress"
                      value={formData.homeAddress}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 py-2 border ${
                        errors.homeAddress
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                    {errors.homeAddress && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.homeAddress}
                      </p>
                    )}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="mb-6">
                  <label className="block text-blue-700 text-sm font-medium mb-1">
                    Personal Information<span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">
                        Date of Birth
                      </div>
                      <div className="relative" ref={datepickerRef}>
                        <div
                          className={`w-full px-3 py-2 border ${
                            errors.dateOfBirth
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer flex justify-between items-center text-sm placeholder:text-sm`}
                          onClick={() => setShowDatepicker(!showDatepicker)}
                        >
                          <span
                            className={`${
                              formData.dateOfBirth
                                ? "text-gray-700"
                                : "text-gray-400"
                            }`}
                          >
                            {formData.dateOfBirth
                              ? formatDateForDisplay(formData.dateOfBirth)
                              : "DD/MM/YYYY"}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-blue-600"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                            ></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                        </div>

                        {/* Custom Datepicker similar to Admin.tsx */}
                        {showDatepicker && (
                          <div className="absolute mt-2 w-72 bg-white shadow-lg rounded-lg p-4 z-50 border border-blue-100">
                            <div className="flex justify-between items-center mb-4 bg-blue-50 p-3 rounded-lg">
                              <button
                                onClick={handlePrevMonth}
                                className="text-blue-600 hover:bg-blue-100 rounded-full p-1.5 transition-all"
                              >
                                <ChevronLeft size={16} />
                              </button>

                              <div className="flex space-x-2">
                                <select
                                  value={currentMonth}
                                  onChange={(e) =>
                                    setCurrentMonth(parseInt(e.target.value))
                                  }
                                  className="bg-white border border-blue-200 rounded-lg px-2 py-1 text-sm text-blue-600"
                                >
                                  {months.map((month, idx) => (
                                    <option key={month} value={idx}>
                                      {month}
                                    </option>
                                  ))}
                                </select>

                                <select
                                  value={currentYear}
                                  onChange={(e) =>
                                    setCurrentYear(parseInt(e.target.value))
                                  }
                                  className="bg-white border border-blue-200 rounded-lg px-2 py-1 text-sm text-blue-600"
                                >
                                  {Array.from(
                                    { length: 100 },
                                    (_, i) => currentYear - 80 + i
                                  ).map((year) => (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <button
                                onClick={handleNextMonth}
                                className="text-blue-600 hover:bg-blue-100 rounded-full p-1.5 transition-all"
                              >
                                <ChevronRight size={16} />
                              </button>
                            </div>

                            <div className="bg-blue-50 p-3 rounded-lg mb-4">
                              <div className="grid grid-cols-7 gap-1 text-center">
                                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                                  (day, i) => (
                                    <div
                                      key={i}
                                      className="text-xs text-gray-500 font-medium"
                                    >
                                      {day}
                                    </div>
                                  )
                                )}
                                {renderCalendar()}
                              </div>
                            </div>

                            <div className="flex justify-between">
                              <button
                                className="px-3 py-1.5 text-blue-600 text-sm hover:bg-blue-50 rounded-md transition-all"
                                onClick={() => setShowDatepicker(false)}
                              >
                                Cancel
                              </button>
                              <button
                                className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-all"
                                onClick={() => setShowDatepicker(false)}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Hidden input for form submission */}
                        <input
                          type="hidden"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                        />
                      </div>
                      {errors.dateOfBirth && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.dateOfBirth}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="text-xs text-gray-600 mb-1">Age</div>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 py-2 border ${
                          errors.age ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      />
                      {errors.age && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.age}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="text-xs text-gray-600 mb-1">Gender</div>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 py-2 border ${
                          errors.gender ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600 text-sm placeholder:text-sm`}
                      >
                        <option value="" className="text-gray-600">
                          Select Gender
                        </option>
                        <option value="Male" className="text-gray-600">
                          Male
                        </option>
                        <option value="Female" className="text-gray-600">
                          Female
                        </option>
                        <option value="Other" className="text-gray-600">
                          Other
                        </option>
                      </select>
                      {errors.gender && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.gender}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">
                        Citizenship
                      </div>
                      <input
                        type="text"
                        name="citizenship"
                        value={formData.citizenship}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 py-2 border ${
                          errors.citizenship
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      />
                      {errors.citizenship && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.citizenship}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="text-xs text-gray-600 mb-1">
                        Civil Status
                      </div>
                      <select
                        name="civilStatus"
                        value={formData.civilStatus}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 py-2 border ${
                          errors.civilStatus
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600 text-sm placeholder:text-sm`}
                      >
                        <option value="" className="text-gray-600">
                          Select Status
                        </option>
                        <option value="Single" className="text-gray-600">
                          Single
                        </option>
                        <option value="Married" className="text-gray-600">
                          Married
                        </option>
                        <option value="Widowed" className="text-gray-600">
                          Widowed
                        </option>
                        <option value="Separated" className="text-gray-600">
                          Separated
                        </option>
                        <option value="Divorced" className="text-gray-600">
                          Divorced
                        </option>
                      </select>
                      {errors.civilStatus && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.civilStatus}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="text-xs text-gray-600 mb-1">Religion</div>
                      <input
                        type="text"
                        name="religion"
                        value={formData.religion}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 py-2 border ${
                          errors.religion ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      />
                      {errors.religion && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.religion}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Page Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 font-medium transition duration-300 flex items-center"
              >
                Next Page
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Keeping the original ProgressTracker component exactly as it was
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

export default StudentPersonalData;
