import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Updatefeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { feedback } = location.state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (feedback) {
      setName(feedback.name);
      setEmail(feedback.email);
      setContactNo(feedback.contactNo);
      setDescription(feedback.description);
    }
  }, [feedback]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFeedback = {
      name,
      email,
      contactNo,
      description,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/feedback/${feedback._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFeedback),
        }
      );

      if (response.ok) {
        setShowSuccessModal(true); // Show success modal
        setTimeout(() => {
          setShowSuccessModal(false); // Hide modal after 1.5 seconds
          navigate("/feedbackdetails"); // Navigate back to Feedbackdetails page
        }, 1500); // Wait 1.5 seconds before navigating
      } else {
        setMessage("Failed to update feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error updating feedback:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 flex items-center justify-center gap-2">
          <span role="img" aria-label="megaphone">
            📢
          </span>{" "}
          Update Feedback
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We value your feedback! Please share your thoughts below.
        </p>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-green-600 text-lg font-semibold">
                Feedback updated successfully!
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {message && <p className="text-center text-red-600 mb-4">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Contact No</label>
            <input
              type="text"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none h-24"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <span role="img" aria-label="rocket">
              🚀
            </span>{" "}
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updatefeedback;
