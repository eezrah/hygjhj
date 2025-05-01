import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import axios

// Regex patterns for validation
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.(sti\.edu\.ph)$/;
const PHONE_REGEX = /^09\d{2}\s\d{3}\s\d{4}$/;
const LETTERS_ONLY_REGEX = /^[a-zA-Z]+$/;
const NUMBERS_ONLY_REGEX = /^\d+$/;

// Validation messages
const ERROR_MESSAGES = {
  required: "This field is required",
  lettersOnly: "Only letters are allowed",
  emailRequired: "Email is required",
  emailInvalid: "Invalid email format",
  passwordRequired: "Password is required",
  passwordInvalid:
    "Password must be at least 8 characters long and contain at least one letter and one number",
  confirmPasswordRequired: "Please confirm your password",
  passwordMismatch: "Passwords do not match",
  phoneRequired: "Contact number is required",
  phoneInvalid: "Invalid phone number format",
  studentIdRequired: "Student ID is required",
  studentIdInvalid: "Invalid Student ID format",
  campusRequired: "Campus is required",
  programRequired: "Program is required",
  yearLevelRequired: "Year Level is required",
  graduationBatchRequired: "Graduation Batch is required",
};

// Required fields array
const REQUIRED_FIELDS = [
  "s_Firstname",
  "s_Lastname",
  "StudentID",
  "StudentPassword",
  "confirmPassword",
  "S_SchoolEmail",
  "s_ContactNumber",
  "S_Campus",
  "S_CourseProgram",
  "YearLevel",
  "S_GraduationBatch",
];

// Form options
const PROGRAM_OPTIONS = [
  { value: "", label: "Select Program *" },
  { value: "Information Technology", label: "Information Technology" },
  { value: "Computer Science", label: "Computer Science" },
];

const YEAR_LEVEL_OPTIONS = [
  { value: "", label: "Select Year Level *" },
  { value: "2nd Year", label: "2nd Year" },
  { value: "3rd Year", label: "3rd Year" },
];

const SUFFIX_OPTIONS = [
  { value: "", label: "Select Suffix" },
  { value: "Jr.", label: "Jr." },
  { value: "Sr.", label: "Sr." },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
  { value: "V", label: "V" },
];

// API endpoint
const API_ENDPOINT = "http://localhost:6003/api/student/register";

const StudentSignup = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [filteredCampuses, setFilteredCampuses] = useState<string[]>([]);
  const [showCampusDropdown, setShowCampusDropdown] = useState(false);
  const campusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Add comprehensive STI campus options
  const campusOptions = [
    "Alabang",
    "Global City",
    "Las Piñas",
    "Makati",
    "Muñoz-EDSA",
    "Ortigas-Cainta",
    "Pasay-EDSA",
    "Quezon City",
    "Calamba",
    "Caloocan",
    "Cubao",
    "Fairview",
    "Marikina",
    "Novaliches",
    "Parañaque",
    "San Jose del Monte",
    "Santa Rosa",
    "Tanauan",
    "Angeles",
    "Baguio",
    "Dagupan",
    "Laoag",
    "La Union",
    "Tarlac",
    "Tuguegarao",
    "Cebu",
    "Iloilo",
    "Tacloban",
    "Tagbilaran",
    "Cagayan de Oro",
    "Davao",
    "General Santos",
    "Zamboanga",
  ].sort();

  const [formData, setFormData] = useState({
    s_Firstname: "",
    s_middlename: "",
    s_Lastname: "",
    s_suffix: "",
    s_ContactNumber: "",
    S_SchoolEmail: "",
    S_SecondaryEmail: "",
    S_CourseProgram: "",
    YearLevel: "",
    S_Campus: "",
    StudentID: "",
    S_GraduationBatch: "",
    StudentPassword: "",
    confirmPassword: "",
  });

  // Add useEffect for click outside handling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        campusRef.current &&
        !campusRef.current.contains(event.target as Node)
      ) {
        setShowCampusDropdown(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowCampusDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleCampusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, S_Campus: value }));

    // Filter campuses based on input
    const filtered = campusOptions.filter((campus) =>
      campus.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCampuses(filtered);
    setShowCampusDropdown(true);
  };

  const handleCampusSelect = (campus: string) => {
    setFormData((prev) => ({ ...prev, S_Campus: campus }));
    setShowCampusDropdown(false);
  };

  // Add phone formatting function
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, "");

    // Ensure it starts with 09
    if (!phoneNumber.startsWith("09")) {
      return phoneNumber === "0" ? "0" : "09";
    }

    // Format as 09XX XXX XXXX
    if (phoneNumber.length <= 4) {
      return phoneNumber;
    } else if (phoneNumber.length <= 7) {
      return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4)}`;
    } else {
      return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(
        4,
        7
      )} ${phoneNumber.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    // Only update if it's empty or matches PH format (09XX XXX XXXX)
    if (!formattedNumber || formattedNumber.length <= 14) {
      setFormData((prev) => ({ ...prev, s_ContactNumber: formattedNumber }));
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "S_Campus") {
      handleCampusChange(e as ChangeEvent<HTMLInputElement>);
    } else if (name === "s_ContactNumber") {
      handlePhoneChange(e as ChangeEvent<HTMLInputElement>);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    validateField(fieldName);
  };

  const validateField = (fieldName: string) => {
    const value = formData[fieldName as keyof typeof formData];
    const newErrors = { ...errors };

    switch (fieldName) {
      case "s_Firstname":
      case "s_Lastname":
        if (!value) {
          newErrors[fieldName] = ERROR_MESSAGES.required;
        } else if (!LETTERS_ONLY_REGEX.test(value)) {
          newErrors[fieldName] = ERROR_MESSAGES.lettersOnly;
        } else {
          delete newErrors[fieldName];
        }
        break;
      case "S_SchoolEmail":
        if (!value) {
          newErrors[fieldName] = ERROR_MESSAGES.emailRequired;
        } else if (!EMAIL_REGEX.test(value)) {
          newErrors[fieldName] = ERROR_MESSAGES.emailInvalid;
        } else {
          delete newErrors[fieldName];
        }
        break;
      case "S_SecondaryEmail":
        if (value && !value.includes("@")) {
          newErrors[fieldName] = ERROR_MESSAGES.emailInvalid;
        } else {
          delete newErrors[fieldName];
        }
        break;

      case "StudentPassword":
        if (!value) {
          newErrors[fieldName] = ERROR_MESSAGES.passwordRequired;
        } else {
          console.log("Password value:", value);
          console.log("Regex test result:", PASSWORD_REGEX.test(value));
          if (!PASSWORD_REGEX.test(value)) {
            newErrors[fieldName] = ERROR_MESSAGES.passwordInvalid;
          } else {
            delete newErrors[fieldName];
          }
        }
        break;
      case "confirmPassword":
        if (!value) {
          newErrors[fieldName] = ERROR_MESSAGES.confirmPasswordRequired;
        } else if (value !== formData.StudentPassword) {
          newErrors[fieldName] = ERROR_MESSAGES.passwordMismatch;
        } else {
          delete newErrors[fieldName];
        }
        break;
      case "s_ContactNumber":
        if (!value) {
          newErrors[fieldName] = ERROR_MESSAGES.phoneRequired;
        } else if (!PHONE_REGEX.test(value)) {
          newErrors[fieldName] = ERROR_MESSAGES.phoneInvalid;
        } else {
          delete newErrors[fieldName];
        }
        break;
      case "StudentID":
        if (!value) {
          newErrors[fieldName] = ERROR_MESSAGES.studentIdRequired;
        } else if (!NUMBERS_ONLY_REGEX.test(value)) {
          newErrors[fieldName] = ERROR_MESSAGES.studentIdInvalid;
        } else {
          delete newErrors[fieldName];
        }
        break;
      case "S_Campus":
        if (!value) {
          newErrors[fieldName] = ERROR_MESSAGES.campusRequired;
        } else {
          delete newErrors[fieldName];
        }
        break;
      case "S_CourseProgram":
        if (!value) {
          newErrors[fieldName] = ERROR_MESSAGES.programRequired;
        } else {
          delete newErrors[fieldName];
        }
        break;
      case "YearLevel":
        if (!value) {
          newErrors[fieldName] = ERROR_MESSAGES.yearLevelRequired;
        } else {
          delete newErrors[fieldName];
        }
        break;
      case "S_GraduationBatch":
        if (!value) {
          newErrors[fieldName] = ERROR_MESSAGES.graduationBatchRequired;
        } else {
          delete newErrors[fieldName];
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    // Mark all required fields as touched
    const newTouched = { ...touched };
    REQUIRED_FIELDS.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    // Validate all fields
    const newErrors = { ...errors };
    REQUIRED_FIELDS.forEach((field) => {
      const value = formData[field as keyof typeof formData];
      if (!value) {
        newErrors[field] = ERROR_MESSAGES.required;
      } else {
        delete newErrors[field];
      }
    });

    // Additional validation rules
    if (
      formData.StudentPassword &&
      !PASSWORD_REGEX.test(formData.StudentPassword)
    ) {
      newErrors.StudentPassword = ERROR_MESSAGES.passwordInvalid;
    }
    if (
      formData.confirmPassword &&
      formData.confirmPassword !== formData.StudentPassword
    ) {
      newErrors.confirmPassword = ERROR_MESSAGES.passwordMismatch;
    }
    if (formData.S_SchoolEmail && !EMAIL_REGEX.test(formData.S_SchoolEmail)) {
      newErrors.S_SchoolEmail = ERROR_MESSAGES.emailInvalid;
    }
    if (
      formData.s_ContactNumber &&
      !PHONE_REGEX.test(formData.s_ContactNumber)
    ) {
      newErrors.s_ContactNumber = ERROR_MESSAGES.phoneInvalid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    const isValid = validateForm();

    if (!isChecked) {
      alert("Please agree to the Terms and Conditions before registering.");
      return;
    }

    if (isValid) {
      try {
        // Format student ID to ensure it starts with '02000'
        let studentId = formData.StudentID;
        if (!studentId.startsWith("02000")) {
          studentId = "02000" + studentId.replace(/^0+/, "");
        }

        // Pad to 11 digits if needed
        studentId = studentId.padStart(11, "0");

        const registrationData = {
          student_id: studentId,
          student_password: formData.StudentPassword,
          role_id: 1,
          s_firstname: formData.s_Firstname,
          s_lastname: formData.s_Lastname,
          year_level: formData.YearLevel,
          s_campus: formData.S_Campus,
          s_course_program: formData.S_CourseProgram,
          s_school_email: formData.S_SchoolEmail,
          s_secondary_email: formData.S_SecondaryEmail || "",
          s_contact_number: formData.s_ContactNumber.replace(/\s/g, ""),
          s_graduation_batch: formData.S_GraduationBatch,
          s_middlename: formData.s_middlename || "",
          s_suffix: formData.s_suffix || "",
        };

        console.log("Sending registration data:", registrationData);

        const response = await axios.post(API_ENDPOINT, registrationData);

        if (response.status === 201) {
          navigate("student/studentlogin");
        }
      } catch (error) {
        const err = error as {
          response?: {
            status: number;
            data: {
              message?: string;
              error?: string;
              details?: unknown;
            };
          };
        };
        console.error("Error registering student:", error);
        if (err.response) {
          // Log the full error response
          console.error("Server Error Response:", {
            status: err.response.status,
            data: err.response.data,
          });

          // Show specific error message from server if available
          const errorMessage =
            err.response.data.message ||
            err.response.data.error ||
            "An error occurred while registering. Please check your information and try again.";
          alert(errorMessage);

          // If there are validation errors, show them in the form
          if (err.response.data.details) {
            console.error("Validation Errors:", err.response.data.details);
          }
        } else {
          alert("An error occurred while registering. Please try again.");
        }
      }
    }
  };

  const handleBack = () => {
    navigate("/studentlogin"); // Redirect to student login page
  };

  const clearCampus = () => {
    setFormData((prev) => ({ ...prev, S_Campus: "" }));
    setShowCampusDropdown(false);
  };

  return (
    <div
      className="h-screen flex justify-center items-center bg-white"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top -50px", // Adjust top offset
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-screen bg-white bg-opacity-90 p-4 w-full">
        {/* Navbar */}
        <nav className="border-b border-gray-300 py-2 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src="/metrobanklogoblue.png"
              alt="Metrobank STRONG Logo"
              className="size-8"
            />
            <p className="text-xs text-blue-800 font-bold mb-2">
              Metrobank STRONG <br /> Program Management
            </p>
          </div>
        </nav>

        {/* Create an Account and Back Button */}
        <div className="flex items-center mt-6">
          <button
            onClick={handleBack}
            className="text-blue-600 hover:opacity-80 transition ml-60"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold text-blue-700 ml-6">
            Create an Account
          </h1>
        </div>

        {/* Form Layout */}
        <div className="max-w-5xl mx-auto mt-8">
          {/* Basic Information */}
          <h2 className="text-lg font-semibold text-blue-800">
            1. Basic Information
          </h2>
          <div className="grid grid-cols-4 gap-4 mt-2">
            <div className="flex flex-col">
              <div className="relative">
                <input
                  type="text"
                  name="s_Firstname"
                  placeholder="First Name *"
                  className={`p-2 border rounded-md w-full ${
                    touched.s_Firstname && errors.s_Firstname
                      ? "border-red-500"
                      : "border-blue-300"
                  }`}
                  onChange={handleChange}
                  onBlur={() => handleBlur("s_Firstname")}
                  value={formData.s_Firstname}
                  maxLength={50}
                />
                {touched.s_Firstname && errors.s_Firstname && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.s_Firstname}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                name="s_middlename"
                placeholder="Middle Name"
                className="p-2 border rounded-md border-blue-300"
                onChange={handleChange}
                value={formData.s_middlename}
                maxLength={50}
              />
            </div>
            <div className="flex flex-col">
              <div className="relative">
                <input
                  type="text"
                  name="s_Lastname"
                  placeholder="Last Name *"
                  className={`p-2 border rounded-md w-full ${
                    touched.s_Lastname && errors.s_Lastname
                      ? "border-red-500"
                      : "border-blue-300"
                  }`}
                  onChange={handleChange}
                  onBlur={() => handleBlur("s_Lastname")}
                  value={formData.s_Lastname}
                  maxLength={50}
                />
                {touched.s_Lastname && errors.s_Lastname && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.s_Lastname}
                  </p>
                )}
              </div>
            </div>
            <select
              name="s_suffix"
              className="p-2 border rounded-md border-blue-300 text-gray-500"
              onChange={handleChange}
              value={formData.s_suffix}
            >
              {SUFFIX_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Your Account Credentials */}
          <h2 className="text-lg font-semibold text-blue-800 mt-6">
            2. Your Account Credentials
          </h2>
          <div className="grid grid-cols-4 gap-4 mt-2">
            <div className="flex flex-col">
              <input
                type="email"
                name="S_SchoolEmail"
                placeholder="Student Email *"
                className={`p-2 border rounded-md w-full ${
                  touched.S_SchoolEmail && errors.S_SchoolEmail
                    ? "border-red-500"
                    : "border-blue-300"
                }`}
                onChange={handleChange}
                onBlur={() => handleBlur("S_SchoolEmail")}
                value={formData.S_SchoolEmail}
                maxLength={100}
              />
              {touched.S_SchoolEmail && errors.S_SchoolEmail && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.S_SchoolEmail}
                </p>
              )}
            </div>
            <div className="flex flex-col relative">
              <input
                type={showPassword ? "text" : "password"}
                name="StudentPassword"
                placeholder="Password *"
                className={`p-2 border rounded-md w-full ${
                  touched.StudentPassword && errors.StudentPassword
                    ? "border-red-500"
                    : "border-blue-300"
                }`}
                onChange={handleChange}
                onBlur={() => handleBlur("StudentPassword")}
                value={formData.StudentPassword}
                maxLength={100}
              />
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {touched.StudentPassword && errors.StudentPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.StudentPassword}
                </p>
              )}
            </div>
            <div className="flex flex-col relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password *"
                className={`p-2 border rounded-md w-full ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "border-red-500"
                    : "border-blue-300"
                }`}
                onChange={handleChange}
                onBlur={() => handleBlur("confirmPassword")}
                value={formData.confirmPassword}
                maxLength={100}
              />
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <input
                type="tel"
                name="s_ContactNumber"
                placeholder="Mobile Number * (e.g., 0915 123 4567)"
                className={`p-2 border rounded-md w-full ${
                  touched.s_ContactNumber && errors.s_ContactNumber
                    ? "border-red-500"
                    : "border-blue-300"
                }`}
                onChange={handlePhoneChange}
                onBlur={() => handleBlur("s_ContactNumber")}
                value={formData.s_ContactNumber}
                maxLength={14}
                pattern="09\d{2}\s\d{3}\s\d{4}"
              />
              {touched.s_ContactNumber && errors.s_ContactNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.s_ContactNumber}
                </p>
              )}
            </div>
          </div>

          {/* Student Information */}
          <h2 className="text-lg font-semibold text-blue-800 mt-6">
            3. Student Information
          </h2>
          <div className="grid grid-cols-4 gap-4 mt-2">
            <div className="flex flex-col">
              <input
                type="email"
                name="S_SecondaryEmail"
                placeholder="Secondary Email"
                className="p-2 border rounded-md border-blue-300"
                onChange={handleChange}
                value={formData.S_SecondaryEmail}
                maxLength={100}
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                name="StudentID"
                placeholder="Student ID *"
                className={`p-2 border rounded-md w-full ${
                  touched.StudentID && errors.StudentID
                    ? "border-red-500"
                    : "border-blue-300"
                }`}
                onChange={handleChange}
                onBlur={() => handleBlur("StudentID")}
                value={formData.StudentID}
                maxLength={20}
              />
              {touched.StudentID && errors.StudentID && (
                <p className="text-red-500 text-xs mt-1">{errors.StudentID}</p>
              )}
            </div>
            <div className="relative" ref={campusRef}>
              <div className="relative">
                <input
                  type="text"
                  name="S_Campus"
                  placeholder="Search Campus *"
                  className={`p-2 border rounded-md w-full pr-8 ${
                    touched.S_Campus && errors.S_Campus
                      ? "border-red-500"
                      : "border-blue-300"
                  }`}
                  onChange={handleCampusChange}
                  onBlur={() => handleBlur("S_Campus")}
                  value={formData.S_Campus}
                  onFocus={() => setShowCampusDropdown(true)}
                  maxLength={100}
                />
                {formData.S_Campus && (
                  <button
                    type="button"
                    onClick={clearCampus}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
              {touched.S_Campus && errors.S_Campus && (
                <p className="text-red-500 text-xs mt-1">{errors.S_Campus}</p>
              )}
              {showCampusDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {(filteredCampuses.length > 0
                    ? filteredCampuses
                    : campusOptions
                  ).map((campus, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                      onClick={() => handleCampusSelect(campus)}
                    >
                      {campus}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col">
              <select
                name="S_CourseProgram"
                className={`p-2 border rounded-md w-full ${
                  touched.S_CourseProgram && errors.S_CourseProgram
                    ? "border-red-500"
                    : "border-blue-300"
                } ${!formData.S_CourseProgram ? "text-gray-400" : ""}`}
                onChange={handleChange}
                onBlur={() => handleBlur("S_CourseProgram")}
                value={formData.S_CourseProgram}
              >
                {PROGRAM_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {touched.S_CourseProgram && errors.S_CourseProgram && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.S_CourseProgram}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <select
                name="YearLevel"
                className={`p-2 border rounded-md w-full ${
                  touched.YearLevel && errors.YearLevel
                    ? "border-red-500"
                    : "border-blue-300"
                } ${!formData.YearLevel ? "text-gray-400" : ""}`}
                onChange={handleChange}
                onBlur={() => handleBlur("YearLevel")}
                value={formData.YearLevel}
              >
                {YEAR_LEVEL_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {touched.YearLevel && errors.YearLevel && (
                <p className="text-red-500 text-xs mt-1">{errors.YearLevel}</p>
              )}
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                name="S_GraduationBatch"
                placeholder="Graduation Batch *"
                className={`p-2 border rounded-md w-full ${
                  touched.S_GraduationBatch && errors.S_GraduationBatch
                    ? "border-red-500"
                    : "border-blue-300"
                }`}
                onChange={handleChange}
                onBlur={() => handleBlur("S_GraduationBatch")}
                value={formData.S_GraduationBatch}
                maxLength={10}
              />
              {touched.S_GraduationBatch && errors.S_GraduationBatch && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.S_GraduationBatch}
                </p>
              )}
            </div>
          </div>

          {/* Checkbox for Terms and Conditions */}
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="terms" className="text-gray-700 text-sm">
              By registering, you acknowledge that you have read and agreed to
              our{" "}
              <a href="#" className="text-blue-600 underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          {/* Register Button */}
          <div className="max-w-md mx-auto mt-6">
            <button
              onClick={handleRegister}
              className="bg-blue-600 text-white py-2 rounded-md text-lg hover:bg-blue-700 transition w-full"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
