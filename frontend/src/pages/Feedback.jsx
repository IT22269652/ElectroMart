import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    } else if (name.length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Name should contain only alphabets and spaces";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Contact Number validation
    if (!contactNo.trim()) {
      newErrors.contactNo = "Contact number is required";
    } else if (!/^\d+$/.test(contactNo)) {
      newErrors.contactNo = "Contact number should contain only digits";
    } else if (contactNo.length < 10) {
      newErrors.contactNo = "Contact number must be at least 10 digits long";
    } else if (contactNo.length > 15) {
      newErrors.contactNo = "Contact number must be less than 15 digits";
    }

    // Description validation
    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    } else if (description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        navigate("/feedbackdetails");
        setName("");
        setEmail("");
        setContactNo("");
        setDescription("");
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
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setContactNo(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
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
