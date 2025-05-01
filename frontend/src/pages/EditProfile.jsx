import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEdit, FaSignOutAlt } from "react-icons/fa";
import validator from "validator";

const EditProfile = () => {
  const { token, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    address: "",
    gender: "",
    birthday: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        if (result.success) {
          setUserData(result.user);
          setFormData({
            name: result.user.name,
            email: result.user.email,
            contactNo: result.user.contactNo,
            address: result.user.address,
            gender: result.user.gender,
            birthday: new Date(result.user.birthday)
              .toISOString()
              .split("T")[0],
          });
        } else {
          setError(result.message);
          if (
            result.message === "Token expired" ||
            result.message === "Invalid token"
          ) {
            logout();
            navigate("/login");
          }
        }
      } catch (err) {
        setError("Failed to fetch profile data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, navigate, logout]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific field error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!validator.isEmail(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (
      !validator.isMobilePhone(formData.contactNo, "any", { strictMode: false })
    ) {
      errors.contactNo = "Please enter a valid contact number";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }

    if (
      !["male", "female", "other", "prefer-not-to-say"].includes(
        formData.gender.toLowerCase()
      )
    ) {
      errors.gender =
        "Please select a valid gender (Male, Female, Other, Prefer not to say)";
    }

    if (!validator.isDate(formData.birthday)) {
      errors.birthday = "Please enter a valid birthday (YYYY-MM-DD)";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        // Display success message
        alert("Profile updated successfully!");
        // Navigate to MyProfile page
        navigate("/my-profile");
      } else {
        setError(result.message);
        if (
          result.message === "Token expired" ||
          result.message === "Invalid token"
        ) {
          logout();
          navigate("/login");
        }
      }
    } catch (err) {
      setError("Failed to update profile");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl w-full">
        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-3 rounded-t-lg">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-between py-4 border-b">
          <div className="flex items-center space-x-2">
            <FaUser className="text-gray-700" />
            <span className="text-gray-700 font-medium">Personal Details</span>
          </div>
          <button
            onClick={() => navigate("/my-profile")}
            className="flex items-center space-x-1 text-blue-600 hover:underline"
          >
            <FaEdit className="text-blue-600" />
            <span>Back to Profile</span>
          </button>
        </div>

        {/* Profile Details - Split into Two Columns */}
        {userData && (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
          >
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">FULL NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`border rounded-lg p-2 text-gray-700 ${
                    formErrors.name ? "border-red-500" : ""
                  }`}
                />
                {formErrors.name && (
                  <span className="text-red-500 text-sm">
                    {formErrors.name}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`border rounded-lg p-2 text-gray-700 ${
                    formErrors.email ? "border-red-500" : ""
                  }`}
                />
                {formErrors.email && (
                  <span className="text-red-500 text-sm">
                    {formErrors.email}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">BIRTH DATE</label>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleInputChange}
                  className={`border rounded-lg p-2 text-gray-700 ${
                    formErrors.birthday ? "border-red-500" : ""
                  }`}
                />
                {formErrors.birthday && (
                  <span className="text-red-500 text-sm">
                    {formErrors.birthday}
                  </span>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">GENDER</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`border rounded-lg p-2 text-gray-700 ${
                    formErrors.gender ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {formErrors.gender && (
                  <span className="text-red-500 text-sm">
                    {formErrors.gender}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">ADDRESS</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`border rounded-lg p-2 text-gray-700 ${
                    formErrors.address ? "border-red-500" : ""
                  }`}
                />
                {formErrors.address && (
                  <span className="text-red-500 text-sm">
                    {formErrors.address}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">
                  PHONE NUMBER
                </label>
                <input
                  type="text"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleInputChange}
                  className={`border rounded-lg p-2 text-gray-700 ${
                    formErrors.contactNo ? "border-red-500" : ""
                  }`}
                />
                {formErrors.contactNo && (
                  <span className="text-red-500 text-sm">
                    {formErrors.contactNo}
                  </span>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="col-span-2 flex justify-between mt-6">
              <button
                type="submit"
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaEdit />
                <span>Update Profile</span>
              </button>
              <button
                type="button"
                onClick={() => navigate("/my-profile")}
                className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <FaSignOutAlt />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
