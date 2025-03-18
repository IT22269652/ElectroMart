import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-20 px-6">
      {/* Title */}
      <div className="text-center text-4xl font-extrabold text-blue-800 mb-12">
        <p>
          CONTACT <span className="text-blue-500">US</span>
        </p>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Image */}
        <img
          className="w-full md:max-w-[500px] rounded-xl shadow-xl transform hover:scale-105 transition duration-500"
          src={assets.img5}
          alt="Contact Us"
        />

        {/* Contact Details Card */}
        <div className="bg-white/80 backdrop-blur-lg p-10 rounded-xl shadow-2xl max-w-lg w-full border border-gray-200">
          <p className="text-2xl font-bold text-blue-800 mb-4">OUR OFFICE</p>
          <p className="text-gray-700 text-lg">
            00000 Willms Station <br /> Suite 000, Washington, USA
          </p>
          <p className="text-gray-700 text-lg mt-4">
            📞 Tel: (000) 000-0000 <br /> 📧 Email:
            <span className="text-blue-600 font-medium">
              {" "}
              greatstackdev@gmail.com
            </span>
          </p>

          {/* Careers Section */}
          <p className="text-2xl font-bold text-blue-800 mt-8">
            CAREERS AT ELECTROMART
          </p>
          <p className="text-gray-700 text-lg">
            Learn more about our teams and job openings.
          </p>

          {/* Explore Jobs Button */}
          <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
            🚀 Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
