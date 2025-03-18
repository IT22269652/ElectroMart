import React, { useState } from "react";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, contactNo, description });
    alert("🎉 Feedback submitted successfully!");
    setName("");
    setEmail("");
    setContactNo("");
    setDescription("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 ">
      <form
        onSubmit={handleSubmit}
        className="p-8 shadow-lg rounded-2xl w-full max-w-lg border border-gray-200 bg-white"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-2">
          📢 Feedback
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We value your feedback! Please share your thoughts below.
        </p>

        {/* Input Fields */}
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
          </div>
        </div>

        {/* Submit Button */}
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
