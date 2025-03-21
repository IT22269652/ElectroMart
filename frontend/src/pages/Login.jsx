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
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use AuthContext

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (state === "Sign Up") {
      // Simulate account creation
      console.log("Account created with data:", data);
      alert("Account created successfully!"); // Show success message
      setState("Login"); // Switch to login form
    } else {
      // Simulate login
      console.log("Login with data:", {
        email: data.email,
        password: data.password,
      });
      login("https://via.placeholder.com/40"); // Set user profile image (replace with actual image URL)
      navigate("/"); // Navigate to home page
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
