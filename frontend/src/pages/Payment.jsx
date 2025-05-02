import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse, isValid, isBefore, startOfMonth } from 'date-fns';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], deliveryDetails = {} } = location.state || {};

  const [formData, setFormData] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiryDate: null, // Changed to null for DatePicker
    cvc: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validate cart and delivery details
  if (!cartItems.length || !deliveryDetails._id) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg text-center">
          <h1 className="text-2xl font-bold mb-6">Error</h1>
          <p className="text-red-600">
            Invalid cart or delivery details. Please start from the cart page.
          </p>
          <button
            onClick={() => navigate('/cart')}
            className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  // Calculate total
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)
      .toFixed(2);
  };

  // Validation functions
  const validateNameOnCard = (value) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!value) return 'Name on card is required';
    if (!nameRegex.test(value)) return 'Name on card can only contain letters and spaces';
    return '';
  };

  const validateCardNumber = (value) => {
    const cleanedValue = value.replace(/\s/g, '');
    const numberRegex = /^\d+$/;
    if (!cleanedValue) return 'Card number is required';
    if (!numberRegex.test(cleanedValue)) return 'Card number can only contain numbers';
    if (cleanedValue.length !== 16) return 'Card number must be exactly 16 digits';
    return '';
  };

  const validateExpiryDate = (date) => {
    if (!date || !isValid(date)) return 'Expiry date is required';

    const currentDate = new Date();
    const selectedMonthStart = startOfMonth(date);
    const currentMonthStart = startOfMonth(currentDate);

    if (isBefore(selectedMonthStart, currentMonthStart)) {
      return 'Expiry date cannot be in the past';
    }
    return '';
  };

  const validateCvc = (value) => {
    const cvcRegex = /^\d+$/;
    if (!value) return 'CVC is required';
    if (!cvcRegex.test(value)) return 'CVC can only contain numbers';
    if (value.length !== 3) return 'CVC must be exactly 3 digits';
    return '';
  };

  // Format card number
  const formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const parts = [];
    for (let i = 0; i < cleanedValue.length; i += 4) {
      parts.push(cleanedValue.slice(i, i + 4));
    }
    return parts.join(' ').slice(0, 19);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    }

    setFormData({ ...formData, [name]: formattedValue });

    let error = '';
    switch (name) {
      case 'nameOnCard':
        error = validateNameOnCard(value);
        break;
      case 'cardNumber':
        error = validateCardNumber(formattedValue);
        break;
      case 'cvc':
        error = validateCvc(value);
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  // Handle expiry date change from DatePicker
  const handleExpiryDateChange = (date) => {
    setFormData({ ...formData, expiryDate: date });
    const error = validateExpiryDate(date);
    setErrors({ ...errors, expiryDate: error });
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {
      nameOnCard: validateNameOnCard(formData.nameOnCard),
      cardNumber: validateCardNumber(formData.cardNumber),
      expiryDate: validateExpiryDate(formData.expiryDate),
      cvc: validateCvc(formData.cvc),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const userId = '12345'; // TODO: Replace with authenticated user ID
      console.log('Creating order with data:', { userId, deliveryId: deliveryDetails._id, cartItems });

      // Step 1: Create order
      const orderData = {
        userId,
        deliveryId: deliveryDetails._id,
        paymentId: null, // Will update later
        items: cartItems.map(item => ({
          name: item.name || 'Unknown',
          price: Number(item.price) || 0,
          quantity: Number(item.quantity) || 0,
          image: item.image || 'https://via.placeholder.com/150',
          status: 'Pending',
        })),
        total: parseFloat(calculateTotal()),
      };

      const orderResponse = await axios.post('http://localhost:5000/api/order', orderData, {
        headers: { 'Content-Type': 'application/json' },
      });
      const orderId = orderResponse.data._id;

      console.log('Order created:', orderResponse.data);

      // Step 2: Create payment
      const paymentData = {
        userId,
        orderId,
        nameOnCard: formData.nameOnCard,
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
        expiryDate: formData.expiryDate ? format(formData.expiryDate, 'MM/yy') : '',
        cvc: formData.cvc,
        amount: parseFloat(calculateTotal()),
      };

      console.log('Sending payment data:', paymentData);

      const paymentResponse = await axios.post('http://localhost:5000/api/payment', paymentData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Payment response:', paymentResponse.data);

      // Step 3: Update order with paymentId
      await axios.put(`http://localhost:5000/api/order/${orderId}`, {
        paymentId: paymentResponse.data._id,
      });

      // Show popup message
      const confirmNavigation = window.confirm('Payment Successful! Click OK to view your order.');
      if (confirmNavigation) {
        setFormData({ nameOnCard: '', cardNumber: '', expiryDate: null, cvc: '' });
        navigate('/Order', {
          state: { cartItems, deliveryDetails, paymentDetails: paymentResponse.data, orderId },
        });
      }
    } catch (error) {
      console.error('Full error response:', error.response || error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An error occurred while processing your payment.';
      const errorDetails = error.response?.data?.details || '';
      setErrors({ api: `${errorMessage}${errorDetails ? `: ${errorDetails}` : ''}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Payment Details</h1>

        {errors.api && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{errors.api}</div>
        )}

        <div className="mb-6 flex justify-between items-center">
          <span className="text-lg font-semibold">Total Amount:</span>
          <span className="text-xl font-bold text-purple-600">${calculateTotal()}</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name on Card</label>
            <input
              type="text"
              name="nameOnCard"
              value={formData.nameOnCard}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.nameOnCard ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
              }`}
              disabled={loading}
            />
            {errors.nameOnCard && (
              <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.cardNumber ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
              }`}
              maxLength="19"
              disabled={loading}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
                <DatePicker
                  selected={formData.expiryDate}
                  onChange={handleExpiryDateChange}
                  dateFormat="MM/yy"
                  showMonthYearPicker
                  placeholderText="MM/YY"
                  minDate={new Date()}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.expiryDate ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
                  }`}
                  disabled={loading}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">CVC</label>
                <input
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  placeholder="123"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.cvc ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
                  }`}
                  maxLength="3"
                  disabled={loading}
                />
                {errors.cvc && <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg transition duration-300 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Submit Payment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;