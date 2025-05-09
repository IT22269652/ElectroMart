import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Delivery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = location.state || { cartItems: [] };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    streetAddress2: '',
    city: '',
    customCity: '',
    postalCode: '',
    contactNumber: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // List of cities for the dropdown
  const cities = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Trincomalee', 'Batticaloa', 'Ampara',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Monaragala', 'Ratnapura', 'Kegalle', 'Other'
  ];

  // Mapping of cities to postal codes
  const cityPostalCodes = {
    'Colombo': '11485',
    'Gampaha': '11789',
    'Kalutara': '11456',
    'Kandy': '11123',
    'Matale': '11369',
    'Nuwara Eliya': '11258',
    'Galle': '11741',
    'Matara': '11596',
    'Hambantota': '11785',
    'Jaffna': '11365',
    'Kilinochchi': '11753',
    'Mannar': '11578',
    'Vavuniya': '11984',
    'Mullaitivu': '11785',
    'Trincomalee': '12447',
    'Batticaloa': '11954',
    'Ampara': '14458',
    'Kurunegala': '11856',
    'Puttalam': '11487',
    'Anuradhapura': '11856',
    'Polonnaruwa': '11586',
    'Badulla': '11478',
    'Monaragala': '11365',
    'Ratnapura': '41158',
    'Kegalle': '11785',
    'Other': '' // No predefined postal code for "Other"
  };

  // Validation functions
  const validateName = (value, fieldName) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!value) {
      return `${fieldName} is required`;
    }
    if (!nameRegex.test(value)) {
      return `${fieldName} can only contain letters and spaces`;
    }
    return '';
  };

  const validateCity = (city, customCity) => {
    const cityRegex = /^[A-Za-z\s]+$/;
    if (!city) {
      return 'City is required';
    }
    if (city === 'Other') {
      if (!customCity) {
        return 'Please enter a city name';
      }
      if (!cityRegex.test(customCity)) {
        return 'City can only contain letters and spaces';
      }
    }
    return '';
  };

  const validatePostalCode = (value) => {
    const postalCodeRegex = /^\d+$/;
    if (!value) {
      return 'Postal code is required';
    }
    if (!postalCodeRegex.test(value)) {
      return 'Postal code can only contain numbers';
    }
    if (value.length !== 5) {
      return 'Postal code must be exactly 5 digits';
    }
    return '';
  };

  const validateContactNumber = (value) => {
    const contactNumberRegex = /^\d+$/;
    if (!value) {
      return 'Contact number is required';
    }
    if (!contactNumberRegex.test(value)) {
      return 'Contact number can only contain numbers';
    }
    if (value.length !== 10) {
      return 'Contact number must be exactly 10 digits';
    }
    return '';
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return 'Email is required';
    }
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    // If the city changes, auto-fill the postal code
    if (name === 'city') {
      const postalCode = cityPostalCodes[value] || '';
      updatedFormData = { ...updatedFormData, postalCode };
    }

    setFormData(updatedFormData);

    let error = '';
    switch (name) {
      case 'firstName':
        error = validateName(value, 'First name');
        break;
      case 'lastName':
        error = validateName(value, 'Last name');
        break;
      case 'city':
        error = validateCity(value, formData.customCity);
        break;
      case 'customCity':
        error = validateCity(formData.city, value);
        break;
      case 'postalCode':
        error = validatePostalCode(value);
        break;
      case 'contactNumber':
        error = validateContactNumber(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: error });
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.firstName = validateName(formData.firstName, 'First name');
    newErrors.lastName = validateName(formData.lastName, 'Last name');
    newErrors.streetAddress = formData.streetAddress ? '' : 'Street address is required';
    newErrors.city = validateCity(formData.city, formData.customCity);
    newErrors.postalCode = validatePostalCode(formData.postalCode);
    newErrors.contactNumber = validateContactNumber(formData.contactNumber);
    newErrors.email = validateEmail(formData.email);

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const userId = '12345';
      const deliveryData = {
        userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        streetAddress: formData.streetAddress,
        streetAddress2: formData.streetAddress2,
        city: formData.city === 'Other' ? formData.customCity : formData.city,
        postalCode: formData.postalCode,
        contactNumber: formData.contactNumber,
        email: formData.email,
      };

      const response = await axios.post('http://localhost:5000/api/delivery', deliveryData);
      console.log('Delivery details saved:', response.data);

      alert('Successful!! Your delivery details have been saved.');

      navigate('/payment', {
        state: {
          cartItems,
          deliveryDetails: response.data,
        },
      });
    } catch (error) {
      console.error('Error saving delivery details:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred';
      const errorDetails = error.response?.data?.details || error.message;
      setErrors({ api: `${errorMessage}${errorDetails ? `: ${errorDetails}` : ''}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 relative">
      <div className="slideshow absolute inset-0 z-0">
        <div className="slideshow-image slide1"></div>
        <div className="slideshow-image slide2"></div>
        <div className="slideshow-image slide3"></div>
        <div className="slideshow-image slide4"></div>
        <div className="slideshow-image slide5"></div>
      </div>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="relative bg-white bg-opacity-90 rounded-lg shadow-2xl p-8 w-full max-w-lg transform transition-all duration-300 hover:shadow-3xl z-20">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Delivery Details</h1>

        {errors.api && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {errors.api}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.firstName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
                  }`}
                  disabled={loading}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.lastName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
                  }`}
                  disabled={loading}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Address</label>
            <div>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                placeholder="Street Address"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-3 ${
                  errors.streetAddress ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
                }`}
                disabled={loading}
              />
              {errors.streetAddress && (
                <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>
              )}
            </div>
            <input
              type="text"
              name="streetAddress2"
              value={formData.streetAddress2}
              onChange={handleChange}
              placeholder="Street Address Line 2"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
              disabled={loading}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.city ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
                  }`}
                  disabled={loading}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
                {formData.city === 'Other' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      name="customCity"
                      value={formData.customCity}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.customCity ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
                      }`}
                      disabled={loading}
                    />
                    {errors.customCity && (
                      <p className="text-red-500 text-sm mt-1">{errors.customCity}</p>
                    )}
                  </div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.postalCode ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
                  }`}
                  maxLength="5"
                  disabled={loading || formData.city !== 'Other'} // Disable unless "Other" is selected
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Contact Information</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.contactNumber ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
                  }`}
                  maxLength="10"
                  disabled={loading}
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
                  }`}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
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
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </form>
      </div>

      <style>{`
        .slideshow {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 0;
          overflow: hidden;
        }

        .slideshow-image {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0;
          animation: imageFade 25s infinite;
        }

        .slideshow-image.slide1 {
          background-image: url('https://images.unsplash.com/photo-1633185039987-1b7e5f7b7f7f');
          animation-delay: 0s;
        }

        .slideshow-image.slide2 {
          background-image: url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3');
          animation-delay: 5s;
        }

        .slideshow-image.slide3 {
          background-image: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c');
          animation-delay: 10s;
        }

        .slideshow-image.slide4 {
          background-image: url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158');
          animation-delay: 15s;
        }

        .slideshow-image.slide5 {
          background-image: url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b');
          animation-delay: 20s;
        }

        @keyframes imageFade {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          20% {
            opacity: 1;
          }
          30% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Delivery;