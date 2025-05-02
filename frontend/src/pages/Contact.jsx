import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900">
          Get in <span className="text-indigo-600">Touch</span>
        </h1>
        <p className="mt-2 text-gray-600 text-lg">We'd love to hear from you</p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative">
          <img
            className="w-full h-full object-cover rounded-2xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300"
            src={assets.img1}
            alt="Contact Us"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-2xl"></div>
        </div>

        {/* Contact Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Contact Us
          </h2>

          <div className="space-y-6">
            {/* Location */}
            <div>
              <h3 className="text-xl font-medium text-gray-700">Our Office</h3>
              <p className="text-gray-600 mt-1">
                00000 Willms Station
                <br />
                Suite 000, Washington, USA
              </p>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-xl font-medium text-gray-700">
                Get in Touch
              </h3>
              <p className="text-gray-600 mt-1">
                📞 <span className="text-indigo-600">(000) 000-0000</span>
                <br />
                📧{" "}
                <span className="text-indigo-600">greatstackdev@gmail.com</span>
              </p>
            </div>

            {/* Careers */}
            <div>
              <h3 className="text-xl font-medium text-gray-700">Careers</h3>
              <p className="text-gray-600 mt-1 mb-4">
                Join our team at Electromart
              </p>
              <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300">
                🚀 Explore Opportunities
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
