import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.length < 2) {
          error = "Name must be at least 2 characters long";
        } else if (value.length > 50) {
          error = "Name must be less than 50 characters";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = "Name should contain only alphabets and spaces";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "contactNo":
        if (!value.trim()) {
          error = "Contact number is required";
        } else if (!/^\d+$/.test(value)) {
          error = "Contact number should contain only digits";
        } else if (value.length !== 10) {
          // Changed to exact 10 digits
          error = "Contact number must be exactly 10 digits";
        }
        break;
      case "description":
        if (!value.trim()) {
          error = "Description is required";
        } else if (value.length < 10) {
          error = "Description must be at least 10 characters long";
        } else if (value.length > 500) {
          error = "Description must be less than 500 characters";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (fieldName) => (e) => {
    const value = e.target.value;

    // Update the respective field state
    switch (fieldName) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "contactNo":
        setContactNo(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }

    // Validate in real-time
    const error = validateField(fieldName, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      contactNo: validateField("contactNo", contactNo),
      description: validateField("description", description),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const feedbackData = { name, email, contactNo, description };

    try {
      const response = await fetch("http://localhost:5000/api/feedback/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        alert("🎉 Feedback submitted successfully!");
        navigate("/");
        setName("");
        setEmail("");
        setContactNo("");
        setDescription("");
        setErrors({});
      } else {
        alert("❌ Error submitting feedback");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 shadow-lg rounded-2xl w-full max-w-lg border border-gray-200 bg-white"
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-2">
          📢 Feedback
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We value your feedback! Please share your thoughts below.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-gray-700 font-semibold">Name</label>
            <input
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="text"
              placeholder="Enter your name"
              onChange={handleChange("name")}
              value={name}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Email</label>
            <input
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange("email")}
              value={email}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Contact No</label>
            <input
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="text"
              placeholder="Enter your contact number"
              onChange={handleChange("contactNo")}
              value={contactNo}
              required
            />
            {errors.contactNo && (
              <p className="text-red-500 text-sm mt-1">{errors.contactNo}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Description</label>
            <textarea
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-28"
              placeholder="Write your feedback here..."
              onChange={handleChange("description")}
              value={description}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
        >
          🚀 Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
