import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
// Import icons from react-icons
import { FaUser, FaEdit, FaSignOutAlt } from "react-icons/fa";
// Import the upload area image from assets
import uploadAreaImage from "../assets/upload_area.png"; // Adjust the path based on your project structure

const MyProfile = () => {
  const { token, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // State for the uploaded image preview
  const navigate = useNavigate();

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
          setProfileImage(result.user.profileImage || null); // Set initial profile image if available
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

  // Handle file upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const response = await fetch(
          "http://localhost:5000/api/user/profile/image",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const result = await response.json();
        if (result.success) {
          setProfileImage(URL.createObjectURL(file)); // Preview the uploaded image
          setUserData({ ...userData, profileImage: result.imageUrl }); // Update userData with new image URL
        } else {
          setError("Failed to upload image");
        }
      } catch (err) {
        setError("Error uploading image");
        console.error(err);
      }
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
          <h2 className="text-xl font-semibold">My Account</h2>
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-between py-4 border-b">
          <div className="flex items-center space-x-2">
            <FaUser className="text-gray-700" />
            <span className="text-gray-700 font-medium">Personal Details</span>
          </div>
          <button
            onClick={() => navigate("/edit-profile")}
            className="flex items-center space-x-1 text-blue-600 hover:underline"
          >
            <FaEdit className="text-blue-600" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Profile Picture with Upload */}
        <div className="flex justify-center my-6 relative">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src={profileImage || uploadAreaImage} // Use uploaded image or upload_area.png
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
            title="Click to upload a new profile picture"
          />
        </div>

        {/* Profile Details - Split into Two Columns */}
        {userData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">FULL NAME</label>
                <input
                  type="text"
                  value={userData.name}
                  readOnly
                  className="border rounded-lg p-2 bg-gray-100 text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">EMAIL</label>
                <input
                  type="email"
                  value={userData.email}
                  readOnly
                  className="border rounded-lg p-2 bg-gray-100 text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">BIRTH DATE</label>
                <input
                  type="text"
                  value={new Date(userData.birthday).toLocaleDateString()}
                  readOnly
                  className="border rounded-lg p-2 bg-gray-100 text-gray-700"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">GENDER</label>
                <input
                  type="text"
                  value={userData.gender}
                  readOnly
                  className="border rounded-lg p-2 bg-gray-100 text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">ADDRESS</label>
                <input
                  type="text"
                  value={userData.address}
                  readOnly
                  className="border rounded-lg p-2 bg-gray-100 text-gray-700"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">
                  PHONE NUMBER
                </label>
                <input
                  type="text"
                  value={userData.contactNo}
                  readOnly
                  className="border rounded-lg p-2 bg-gray-100 text-gray-700"
                />
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/edit-profile")}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaEdit />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
