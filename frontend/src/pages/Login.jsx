import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

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
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    // Clear errors when user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Common validations for both Sign Up and Login
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (data.password.length > 20) {
      newErrors.password = "Password must be less than 20 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        data.password
      )
    ) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    // Sign Up specific validations
    if (state === "Sign Up") {
      if (!data.name.trim()) {
        newErrors.name = "Name is required";
      } else if (data.name.length < 2) {
        newErrors.name = "Name must be at least 2 characters long";
      } else if (data.name.length > 50) {
        newErrors.name = "Name must be less than 50 characters";
      } else if (!/^[A-Za-z\s]+$/.test(data.name)) {
        newErrors.name = "Name should contain only alphabets and spaces";
      }

      if (!data.contactNo.trim()) {
        newErrors.contactNo = "Contact number is required";
      } else if (!/^\d+$/.test(data.contactNo)) {
        newErrors.contactNo = "Contact number should contain only digits";
      } else if (data.contactNo.length < 10) {
        newErrors.contactNo = "Contact number must be at least 10 digits long";
      } else if (data.contactNo.length > 15) {
        newErrors.contactNo = "Contact number must be less than 15 digits";
      }

      if (!data.address.trim()) {
        newErrors.address = "Address is required";
      } else if (data.address.length < 10) {
        newErrors.address = "Address must be at least 10 characters long";
      } else if (data.address.length > 200) {
        newErrors.address = "Address must be less than 200 characters";
      }

      if (!data.gender.trim()) {
        newErrors.gender = "Gender is required";
      }

      if (!data.birthday.trim()) {
        newErrors.birthday = "Birthday is required";
      } else {
        const today = new Date();
        const birthDate = new Date(data.birthday);
        const age = today.getFullYear() - birthDate.getFullYear();
        if (birthDate > today) {
          newErrors.birthday = "Birthday cannot be in the future";
        } else if (age < 13) {
          newErrors.birthday = "You must be at least 13 years old";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (state === "Sign Up") {
      // Simulate account creation
      console.log("Account created with data:", data);
      alert("Account created successfully!");
      setState("Login");
    } else {
      // Simulate login
      console.log("Login with data:", {
        email: data.email,
        password: data.password,
      });
      login("https://via.placeholder.com/40"); // Set user profile image
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an
          appointment.
        </p>

        {state === "Sign Up" && (
          <>
            <div className="w-full">
              <p>Full Name</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                name="name"
                type="text"
                onChange={onChangeHandler}
                value={data.name}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="w-full">
              <p>Contact No</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                name="contactNo"
                type="tel"
                onChange={onChangeHandler}
                value={data.contactNo}
                required
              />
              {errors.contactNo && (
                <p className="text-red-500 text-sm mt-1">{errors.contactNo}</p>
              )}
            </div>

            <div className="w-full">
              <p>Address</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                name="address"
                type="text"
                onChange={onChangeHandler}
                value={data.address}
                required
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="w-full">
              <p>Gender</p>
              <select
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                name="gender"
                onChange={onChangeHandler}
                value={data.gender}
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

            <div className="w-full">
              <p>Birthday</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                name="birthday"
                type="date"
                onChange={onChangeHandler}
                value={data.birthday}
                required
              />
              {errors.birthday && (
                <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>
              )}
            </div>
          </>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            name="email"
            type="email"
            onChange={onChangeHandler}
            value={data.email}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            name="password"
            type="password"
            onChange={onChangeHandler}
            value={data.password}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
