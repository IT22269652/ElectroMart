import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ProfileDetails = () => {
  const { token } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/user/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        if (result.success) {
          setCustomers(result.users);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Failed to fetch user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token, navigate]);

  // Handle delete user
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setCustomers(customers.filter((customer) => customer._id !== userId));
        alert("User deleted successfully!");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to delete user");
      console.error(err);
    }
  };

  // Handle search
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle report generation
  const handleGenerateReport = () => {
    try {
      // Initialize jsPDF
      const doc = new jsPDF();

      // Add a title to the PDF
      doc.setFontSize(18);
      doc.text("User Details Report", 14, 22);

      // Define columns for the table
      const columns = [
        { header: "Full Name", dataKey: "name" },
        { header: "Gender", dataKey: "gender" },
        { header: "Email", dataKey: "email" },
        { header: "Address", dataKey: "address" },
        { header: "Contact No", dataKey: "contactNo" },
        { header: "Birthday", dataKey: "birthday" },
      ];

      // Map user data to rows
      const rows = filteredCustomers.map((customer) => ({
        name: customer.name || "N/A",
        gender: customer.gender || "N/A",
        email: customer.email || "N/A",
        address: customer.address || "N/A",
        contactNo: customer.contactNo || "N/A",
        birthday: customer.birthday
          ? new Date(customer.birthday).toLocaleDateString()
          : "N/A",
      }));

      // Check if there are rows to include
      if (rows.length === 0) {
        alert("No user data available to generate a report.");
        return;
      }

      // Add the table to the PDF using autoTable
      autoTable(doc, {
        columns: columns,
        body: rows,
        startY: 30, // Start below the title
        theme: "striped", // Use a striped theme for the table
        styles: {
          fontSize: 10, // Font size for the table
          cellPadding: 3, // Padding for cells
          overflow: "linebreak", // Handle long text by wrapping
        },
        headStyles: {
          fillColor: [41, 128, 185], // Header background color (blue)
          textColor: [255, 255, 255], // Header text color (white)
        },
        columnStyles: {
          address: { cellWidth: "auto" }, // Allow address column to adjust width
        },
      });

      // Save the PDF
      doc.save("user_details_report.pdf");
      console.log("PDF generated and downloaded successfully.");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please check the console for details.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manage Customers</h1>
        <button
          onClick={handleGenerateReport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Generate Report
        </button>
      </div>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Customers table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Birthday
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer._id}>
                <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {customer.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-600">
                  {customer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {customer.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {customer.contactNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(customer.birthday).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(customer._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileDetails;
