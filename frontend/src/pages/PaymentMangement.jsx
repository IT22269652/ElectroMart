import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCheck,
  FaSpinner,
  FaTruck,
  FaCheckCircle,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

const PaymentManagement = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Simulate admin check (in a real app, use AuthContext or a token)
  const isAdmin = true; // Hardcoded for demo; replace with actual auth logic

  useEffect(() => {
    if (!isAdmin) {
      navigate("/"); // Redirect non-admins to home
      return;
    }

    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/payment");
        // Initialize each payment with an action state
        const paymentsWithAction = response.data.map((payment) => ({
          ...payment,
          actionState: "Confirm", // Initial state
        }));
        setPayments(paymentsWithAction);
        setFilteredPayments(paymentsWithAction);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch payment records");
        setLoading(false);
        console.error(err);
      }
    };

    fetchPayments();
  }, [navigate, isAdmin]);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPayments(payments);
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = payments.filter((payment) => {
        return (
          payment.userId.toLowerCase().includes(lowerCaseSearchTerm) ||
          payment.orderId.toLowerCase().includes(lowerCaseSearchTerm) ||
          payment.transactionId.toLowerCase().includes(lowerCaseSearchTerm) ||
          payment.status.toLowerCase().includes(lowerCaseSearchTerm) ||
          payment.amount.toString().includes(searchTerm)
        );
      });
      setFilteredPayments(filtered);
    }
  }, [searchTerm, payments]);

  const handleActionClick = (transactionId) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) => {
        if (payment.transactionId === transactionId) {
          if (payment.actionState === "Confirm") {
            return { ...payment, actionState: "Processing" };
          } else if (payment.actionState === "Processing") {
            return { ...payment, actionState: "Delivery" };
          } else if (payment.actionState === "Delivery") {
            return { ...payment, actionState: "Done" };
          }
          return payment;
        }
        return payment;
      })
    );

    // Also update filtered payments to reflect the change immediately
    setFilteredPayments((prevPayments) =>
      prevPayments.map((payment) => {
        if (payment.transactionId === transactionId) {
          if (payment.actionState === "Confirm") {
            return { ...payment, actionState: "Processing" };
          } else if (payment.actionState === "Processing") {
            return { ...payment, actionState: "Delivery" };
          } else if (payment.actionState === "Delivery") {
            return { ...payment, actionState: "Done" };
          }
          return payment;
        }
        return payment;
      })
    );
  };

  const handleDeletePayment = (transactionId) => {
    if (
      window.confirm("Are you sure you want to delete this payment record?")
    ) {
      setPayments((prevPayments) =>
        prevPayments.filter(
          (payment) => payment.transactionId !== transactionId
        )
      );
      setFilteredPayments((prevPayments) =>
        prevPayments.filter(
          (payment) => payment.transactionId !== transactionId
        )
      );
      console.log(`Deleted payment with Transaction ID: ${transactionId}`);
      // In a real app, add an API call here to delete from the backend
    }
  };

  if (!isAdmin) {
    return null; // Redirect already handled in useEffect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Payment Management
        </h1>

        {/* Search Bar */}
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by User ID, Order ID, Transaction ID, Status or Amount..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {filteredPayments.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">
              {searchTerm
                ? "No payment records match your search"
                : "No payment records found."}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-4">User ID</th>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Transaction ID</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.transactionId}
                      className="border-b last:border-b-0"
                    >
                      <td className="p-4">{payment.userId}</td>
                      <td className="p-4">{payment.orderId}</td>
                      <td className="p-4">${payment.amount.toFixed(2)}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded ${
                            payment.status === "Completed"
                              ? "bg-green-200 text-green-800"
                              : payment.status === "Pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="p-4">{payment.transactionId}</td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleActionClick(payment.transactionId)
                            }
                            className={`px-3 py-1 rounded text-white flex items-center justify-center space-x-2 ${
                              payment.actionState === "Confirm"
                                ? "bg-blue-600 hover:bg-blue-700"
                                : payment.actionState === "Processing"
                                ? "bg-yellow-600 hover:bg-yellow-700"
                                : payment.actionState === "Delivery"
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-600 hover:bg-gray-700"
                            }`}
                            disabled={payment.actionState === "Done"}
                          >
                            {payment.actionState === "Confirm" && <FaCheck />}
                            {payment.actionState === "Processing" && (
                              <FaSpinner className="animate-spin" />
                            )}
                            {payment.actionState === "Delivery" && <FaTruck />}
                            {payment.actionState === "Done" && (
                              <FaCheckCircle />
                            )}
                            <span>{payment.actionState}</span>
                          </button>
                          <button
                            onClick={() =>
                              handleDeletePayment(payment.transactionId)
                            }
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center space-x-2"
                          >
                            <FaTrash />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentManagement;
