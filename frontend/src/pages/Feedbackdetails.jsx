import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Feedbackdetails = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/feedback/all");
      const data = await response.json();
      setFeedbacks(data);
      setFilteredFeedbacks(data); // Initialize filtered feedbacks with all data
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  // Handle search
  useEffect(() => {
    const filtered = feedbacks.filter(
      (fb) =>
        fb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fb.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fb.contactNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fb.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFeedbacks(filtered);
  }, [searchQuery, feedbacks]);

  // Delete Feedback
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/feedback/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setFeedbacks(feedbacks.filter((fb) => fb._id !== id));
          setFilteredFeedbacks(filteredFeedbacks.filter((fb) => fb._id !== id));
        } else {
          console.error("Failed to delete feedback");
        }
      } catch (error) {
        console.error("Error deleting feedback:", error);
      }
    }
  };

  // Navigate to Update Page with Feedback Data
  const handleEditClick = (feedback) => {
    navigate("/updatefeedback", { state: { feedback } });
  };

  // Generate PDF Report
  const generateReport = () => {
    const doc = new jsPDF();

    // Add a title to the PDF
    doc.setFontSize(18);
    doc.text("Feedback Report", 14, 22);

    // Define columns for the table
    const columns = ["Name", "Email", "Contact No", "Description"];

    // Map feedback data to rows
    const rows = filteredFeedbacks.map((fb) => [
      fb.name,
      fb.email,
      fb.contactNo,
      fb.description,
    ]);

    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30, // Start below the title
      theme: "striped", // Use a striped theme for the table
      styles: {
        fontSize: 10, // Font size for the table
        cellPadding: 3, // Padding for cells
      },
      headStyles: {
        fillColor: [41, 128, 185], // Header background color
        textColor: [255, 255, 255], // Header text color
      },
    });

    // Save the PDF
    doc.save("feedback_report.pdf");
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
        📃 Manage Details
      </h2>

      {/* Search and Generate Report Section */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by name, email, contact no, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button
          onClick={generateReport}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Generate Report
        </button>
      </div>

      {/* Feedback Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
                Contact No
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
                Description
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-600">
                  No matching feedback found.
                </td>
              </tr>
            ) : (
              filteredFeedbacks.map((fb) => (
                <tr key={fb._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">
                    {fb.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-600">
                    {fb.email}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-600">
                    {fb.contactNo}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-800">
                    {fb.description}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleEditClick(fb)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(fb._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedbackdetails;
