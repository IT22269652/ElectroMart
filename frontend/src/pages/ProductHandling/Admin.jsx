import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const handleProductManagementClick = () => {
    navigate("/admin-dashboard");
  };

  const handleProfileDetailsClick = () => {
    navigate("/profile-details");
  };

  const handleFeedbackManagementClick = () => {
    navigate("/feedbackdetails");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Admin Navbar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">ADMIN PANEL</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Management Card */}
          <div
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-between hover:shadow-xl transition-shadow cursor-pointer"
            onClick={handleProductManagementClick}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Product Management
            </h2>
            <p className="text-gray-500 text-center mb-4">
              Update inventory, manage product details, categories, and handle
              availability.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Manage Products
            </button>
          </div>

          {/* Customer Profile Management Card */}
          <div
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-between hover:shadow-xl transition-shadow"
            onClick={handleProfileDetailsClick}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Customer Profile Management
            </h2>
            <p className="text-gray-500 text-center mb-4">
              View and manage customer accounts, review reading habits, and
              handle customer inquiries.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Manage User Profiles
            </button>
          </div>

          {/* Customer Feedback Management Card */}
          <div
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-between hover:shadow-xl transition-shadow cursor-pointer"
            onClick={handleFeedbackManagementClick}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Customer Feedback Management
            </h2>
            <p className="text-gray-500 text-center mb-4">
              View and manage customer feedbacks.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Manage Customer Feedbacks
            </button>
          </div>

          {/* Payment Management Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-between hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Payment Management
            </h2>
            <p className="text-gray-500 text-center mb-4">
              Track product sales, process refunds, and review payment analytics
              for your store.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Payment Gateway
            </button>
          </div>

          {/* Delivery Management Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-between hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Delivery Management
            </h2>
            <p className="text-gray-500 text-center mb-4">
              Track product shipments, manage delivery partners, and monitor
              delivery statuses.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Manage Deliveries
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
