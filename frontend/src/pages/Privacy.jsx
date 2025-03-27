import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 md:mx-10">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Last Updated: March 27, 2025
        </p>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 leading-6">
              Welcome to ElectroMart.dev ("we", "us", or "our"). We are
              committed to protecting your personal information and your right
              to privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website or make a purchase from us.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 leading-6 mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                <span className="font-medium">Personal Information:</span> Name,
                email address, phone number, and shipping address when you
                create an account or place an order.
              </li>
              <li>
                <span className="font-medium">Payment Information:</span> Credit
                card details or other payment method information processed
                through secure payment gateways.
              </li>
              <li>
                <span className="font-medium">Browsing Data:</span> IP address,
                browser type, and pages visited through cookies and similar
                technologies.
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-6">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your purchases</li>
              <li>Improve our website and services</li>
              <li>Send promotional emails (with your consent)</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Sharing Your Information
            </h2>
            <p className="text-gray-600 leading-6">
              We do not sell your personal information. We may share your
              information with:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
              <li>
                Service providers (e.g., payment processors, shipping companies)
              </li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 leading-6">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          {/* Back to Home Link */}
          <div className="text-center">
            <Link
              to="/"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
