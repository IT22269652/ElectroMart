import React from "react";
import { assets } from "../assets/assets";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="md:mx-10 py-12">
      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
        {/* -------Left Section------*/}
        <div className="flex flex-col items-start">
          <img
            className="mb-5 w-40 transform hover:scale-105 transition-transform duration-300"
            src={assets.logo1}
            alt="ElectroMart Logo"
          />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
          {/* Social Media Icons with Colors */}
          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              className="text-cyan-500 hover:text-cyan-700 transition-colors duration-300"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-pink-500 hover:text-pink-700 transition-colors duration-300"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-blue-700 hover:text-blue-900 transition-colors duration-300"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* -------Center Section (Company)------*/}
        <div className="flex flex-col">
          <p className="text-xl font-semibold mb-5 text-gray-800">COMPANY</p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <li className="flex items-center gap-2 hover:text-blue-500 transition-colors duration-300">
              <FaHome className="text-green-500" />
              <Link to="/">Home</Link>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-500 transition-colors duration-300">
              <FaInfoCircle className="text-blue-400" />
              <Link to="/about">About Us</Link>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-500 transition-colors duration-300">
              <FaEnvelope className="text-purple-500" />
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-500 transition-colors duration-300">
              <FaLock className="text-red-500" />
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* -------Right Section (Get in Touch)------*/}
        <div className="flex flex-col">
          <p className="text-xl font-semibold mb-5 text-gray-800">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <li className="flex items-center gap-2 hover:text-blue-500 transition-colors duration-300">
              <FaPhone className="text-teal-500" /> 041 458 7634
            </li>
            <li className="flex items-center gap-2 hover:text-blue-500 transition-colors duration-300">
              <FaEnvelope className="text-indigo-500" />{" "}
              ElectroMartdev@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/*---------Copyright Text---------*/}
      <div className="mt-10">
        <hr className="border-gray-300" />
        <p className="py-5 text-sm text-center text-gray-600">
          Copyright {new Date().getFullYear()} ©{" "}
          <span className="text-blue-500 font-medium">ElectroMart.dev</span> -
          All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
