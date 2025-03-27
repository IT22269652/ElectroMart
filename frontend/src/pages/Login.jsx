import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

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
        if (!value.trim()) error = "Name is required";
        else if (value.length < 2) error = "Name must be at least 2 characters";
        else if (value.length > 50)
          error = "Name must be less than 50 characters";
        else if (!/^[A-Za-z\s]+$/.test(value))
          error = "Name should contain only letters";
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
        if (!value.trim()) error = "Contact number is required";
        else if (!/^\d+$/.test(value)) error = "Only digits allowed";
        else if (value.length < 10) error = "Must be 10 digits";
        break;
      case "address":
        if (!value.trim()) error = "Address is required";
        else if (value.length < 10)
          error = "Address must be at least 10 characters";
        break;
      case "gender":
        if (!value.trim()) error = "Gender is required";
        break;
      case "birthday":
        if (!value.trim()) error = "Birthday is required";
        else if (new Date(value) > new Date())
          error = "Birthday cannot be in future";
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(data).forEach((field) => {
      if (state === "Login" && !["email", "password"].includes(field)) return;
      newErrors[field] = validateField(field, data[field]);
    });
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (state === "Sign Up") {
      console.log("Account created:", data);
      alert("Account created successfully!");
      setState("Login");
    } else {
      console.log("Login with:", { email: data.email });
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-4 w-full max-w-md p-8 border rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        {state === "Sign Up" && (
          <>
            <div className="relative">
              <label className="block mb-1">Full Name</label>
              <input
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                name="name"
                type="text"
                value={data.name}
                onChange={onChangeHandler}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                required
              />
              {focusedField === "name" && (
                <div className="absolute right-2 top-8">
                  <VoiceInput onVoiceResult={handleVoiceResult} />
                </div>
              )}
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Contact Number</label>
              <input
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                name="contactNo"
                type="text"
                value={data.contactNo}
                onChange={onChangeHandler}
                required
              />
              {errors.contactNo && (
                <p className="text-red-500 text-sm mt-1">{errors.contactNo}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Address</label>
              <input
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                name="address"
                type="text"
                value={data.address}
                onChange={onChangeHandler}
                required
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Gender</label>
              <select
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                name="gender"
                value={data.gender}
                onChange={onChangeHandler}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Birthday</label>
              <input
                type="date"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                name="birthday"
                value={data.birthday}
                onChange={onChangeHandler}
                required
              />
              {errors.birthday && (
                <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>
              )}
            </div>
          </>
        )}

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <p className="text-center">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setState("Login")}
                className="text-blue-600 hover:underline"
              >
                Login here
              </button>
            </>
          ) : (
            <>
              Need an account?{" "}
              <button
                type="button"
                onClick={() => setState("Sign Up")}
                className="text-blue-600 hover:underline"
              >
                Sign up
              </button>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
