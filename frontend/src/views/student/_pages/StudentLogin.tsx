import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      console.log("Attempting login to:", "http://localhost:6003/api/student/login");
      const response = await axios.post(
        "http://localhost:6003/api/student/login",
        {
          s_schoolemail: email,
          studentpassword: password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login response:", response.data);

      if (response.data.success) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify({
          studentid: response.data.student.studentid,
          s_schoolemail: response.data.student.s_schoolemail,
          roleid: response.data.student.roleid
        }));

        console.log("Stored user in localStorage, navigating to dashboard");
        
        // Verify that cookies are properly set
        console.log("Cookies:", document.cookie);
        
        // Navigate after short delay to ensure cookies are set
        setTimeout(() => {
          navigate("/student/studentdashboard");
        }, 100);
      }
    } catch (err) {
      console.error("Login error:", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Invalid email or password");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center bg-white"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top 100%", // Adjust top offset
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" p-10 rounded-lg w-[28rem] shadow-2xl shadow-black/50 bg-white bg-opacity-90">
        {/* Logo */}
        <div className="flex items-center justify-center p-3 rounded-md mb-8 ml-3">
          <img
            src="/metrobanklogo.png"
            alt="Metrobank STRONG Logo"
            className="w-10 h-10 mr-1"
          />
          <div className="text-blue-800 font-bold text-sm leading-tight">
            Metrobank STRONG
            <br />
            Program Management
          </div>
        </div>

        {/* Welcome Message */}
        <h2 className="text-blue-700 text-lg font-semibold text-left mb-4">
          Welcome Back!
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">
            E-mail Address
          </label>
          <input
            type="email"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute top-8 right-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Forgot Password */}
        <div className="text-right mb-4">
          <a href="#" className="text-blue-600 text-sm">
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md text-lg hover:bg-blue-700 transition"
          onClick={handleLogin} // Call handleLogin function
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Sign Up Section */}
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-2">Don't have an account?</p>
          <button
            className="w-full border border-blue-600 text-blue-600 py-2 rounded-md text-lg hover:bg-blue-600 hover:text-white transition"
            onClick={() => navigate("/student/studentsignup")} // Navigate to StudentSignup
          >
            Create One
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
