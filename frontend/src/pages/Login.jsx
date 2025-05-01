import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import VoiceInput from "../components/VoiceInput";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    contactNo: "",
    address: "",
    gender: "",
    birthday: "",
  });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [forgotPasswordErrors, setForgotPasswordErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleVoiceResult = (result) => {
    setData((prevData) => ({ ...prevData, name: result }));
    setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
  };

  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "name":
        if (state === "Sign Up") {
          if (!value.trim()) error = "Name is required";
          else if (value.length < 2)
            error = "Name must be at least 2 characters";
          else if (value.length > 50)
            error = "Name must be less than 50 characters";
          else if (!/^[A-Za-z\s]+$/.test(value))
            error = "Name should contain only letters and spaces";
        }
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        else if (value.length < 8)
          error = "Password must be at least 8 characters";
        else if (value.length > 20)
          error = "Password must be less than 20 characters";
        break;
      case "contactNo":
        if (state === "Sign Up") {
          if (!value.trim()) error = "Contact number is required";
          else if (!/^\d+$/.test(value))
            error = "Contact number should contain only digits";
          else if (value.length !== 10)
            error = "Contact number must be 10 digits";
        }
        break;
      case "address":
        if (state === "Sign Up") {
          if (!value.trim()) error = "Address is required";
          else if (value.length < 10)
            error = "Address must be at least 10 characters";
          else if (value.length > 200)
            error = "Address must be less than 200 characters";
        }
        break;
      case "gender":
        if (state === "Sign Up" && !value.trim()) error = "Gender is required";
        break;
      case "birthday":
        if (state === "Sign Up") {
          if (!value.trim()) error = "Birthday is required";
          else {
            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();
            if (birthDate > today) error = "Birthday cannot be in the future";
            else if (age < 13) error = "You must be at least 13 years old";
          }
        }
        break;
      default:
        break;
    }
    return error;
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    const fields =
      state === "Sign Up"
        ? [
            "name",
            "email",
            "password",
            "contactNo",
            "address",
            "gender",
            "birthday",
          ]
        : ["email", "password"];

    fields.forEach((field) => {
      const error = validateField(field, data[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const url =
      state === "Sign Up"
        ? "http://localhost:5000/api/user/register"
        : "http://localhost:5000/api/user/login";
    const payload =
      state === "Sign Up"
        ? data
        : { email: data.email, password: data.password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (result.success) {
        if (state === "Sign Up") {
          alert("Account created successfully!");
          setState("Login");
          setData({
            name: "",
            email: "",
            password: "",
            contactNo: "",
            address: "",
            gender: "",
            birthday: "",
          });
          setErrors({});
        } else {
          login(result.token);
          if (rememberMe) {
            localStorage.setItem("authToken", result.token);
          } else {
            localStorage.removeItem("authToken");
          }
          navigate("/");
        }
      } else {
        console.error("Backend error:", result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(
        "An error occurred while connecting to the server. Please ensure the backend server is running on port 5000."
      );
    }
  };

  // Forgot Password Form Validation
  const validateForgotPasswordForm = () => {
    const newErrors = {};

    if (!forgotPasswordData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotPasswordData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!forgotPasswordData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (forgotPasswordData.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters";
    } else if (forgotPasswordData.newPassword.length > 20) {
      newErrors.newPassword = "New password must be less than 20 characters";
    }

    if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setForgotPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Forgot Password Input Changes
  const handleForgotPasswordChange = (event) => {
    const { name, value } = event.target;
    setForgotPasswordData((prevData) => ({ ...prevData, [name]: value }));
    setForgotPasswordErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Handle Forgot Password Submission
  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();

    if (!validateForgotPasswordForm()) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: forgotPasswordData.email,
            newPassword: forgotPasswordData.newPassword,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert(
          "Password reset successfully! Please log in with your new password."
        );
        setShowForgotPassword(false);
        setForgotPasswordData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
        setForgotPasswordErrors({});
        setState("Login");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(
        "An error occurred while resetting the password. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Login Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="flex flex-col gap-4 p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-indigo-600 mb-1">
              {state === "Sign Up" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-zinc-500 mb-6">
              {state === "Sign Up"
                ? "Join us to get started"
                : "Log in to continue your journey"}
            </p>
          </div>

          {state === "Sign Up" && (
            <>
              <div className="relative">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Full Name
                </label>
                <input
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  name="name"
                  type="text"
                  onChange={onChangeHandler}
                  onFocus={() => handleFocus("name")}
                  onBlur={handleBlur}
                  value={data.name}
                  placeholder="your name"
                />
                {focusedField === "name" && (
                  <div className="absolute right-2 top-8">
                    <VoiceInput onVoiceResult={handleVoiceResult} />
                  </div>
                )}
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Contact Number
                </label>
                <input
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  name="contactNo"
                  type="tel"
                  onChange={onChangeHandler}
                  value={data.contactNo}
                  placeholder="1234567890"
                />
                {errors.contactNo && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contactNo}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Address
                </label>
                <input
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  name="address"
                  type="text"
                  onChange={onChangeHandler}
                  value={data.address}
                  placeholder="your address"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Gender
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  name="gender"
                  onChange={onChangeHandler}
                  value={data.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                )}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Birthday
                </label>
                <input
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  name="birthday"
                  type="date"
                  onChange={onChangeHandler}
                  value={data.birthday}
                />
                {errors.birthday && (
                  <p className="text-red-500 text-xs mt-1">{errors.birthday}</p>
                )}
              </div>
            </>
          )}

          <div className="w-full">
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Email
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              name="email"
              type="email"
              onChange={onChangeHandler}
              value={data.email}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              name="password"
              type="password"
              onChange={onChangeHandler}
              value={data.password}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me and Forgot Password */}
          {state === "Login" && (
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2 text-zinc-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-zinc-300 rounded"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-indigo-600 hover:underline focus:outline-none"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 mt-2 shadow-md hover:shadow-lg active:scale-95"
          >
            {state === "Sign Up" ? "Create Account" : "Login"}
          </button>
          <div className="text-center w-full mt-4 text-sm">
            {state === "Sign Up" ? (
              <p className="text-zinc-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setState("Login");
                    setErrors({});
                    setData({
                      name: "",
                      email: "",
                      password: "",
                      contactNo: "",
                      address: "",
                      gender: "",
                      birthday: "",
                    });
                  }}
                  className="text-indigo-600 font-medium hover:underline focus:outline-none"
                >
                  Login here
                </button>
              </p>
            ) : (
              <p className="text-zinc-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setState("Sign Up");
                    setErrors({});
                  }}
                  className="text-indigo-600 font-medium hover:underline focus:outline-none"
                >
                  Sign up here
                </button>
              </p>
            )}
          </div>
        </div>
      </form>

      {/* Forgot Password Popup */}
      {showForgotPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
              Reset Password
            </h2>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={forgotPasswordData.email}
                  onChange={handleForgotPasswordChange}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
                {forgotPasswordErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {forgotPasswordErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={forgotPasswordData.newPassword}
                  onChange={handleForgotPasswordChange}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                {forgotPasswordErrors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {forgotPasswordErrors.newPassword}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={forgotPasswordData.confirmPassword}
                  onChange={handleForgotPasswordChange}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                {forgotPasswordErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {forgotPasswordErrors.confirmPassword}
                  </p>
                )}
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;
