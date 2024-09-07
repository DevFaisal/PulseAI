// src/LandingPage.js
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-6 text-center">
        <h1 className="text-5xl font-bold">Welcome to Pulse AI</h1>
        <p className="mt-4 text-lg">
          Revolutionizing Healthcare with Advanced AI Solutions for Hospitals
        </p>
        <div className="mt-8">
          <Link
            to={"/login"}
            className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-100 transition duration-200"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Features and Sign-Up/Login */}
      <main className="py-16 px-6">
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800">
            AI-Driven Healthcare Solutions
          </h2>
          <p className="mt-4 text-gray-600">
            Pulse AI: Transforming Remote Patient Care Pulse AI empowers
            healthcare providers with AI-driven solutions for real-time
            monitoring, chronic disease management, post-op care, and cancer
            treatment. Enhance patient outcomes with seamless, personalized
            care—anytime, anywhere. Pulse AI is your partner in delivering the
            future of remote healthcare.
          </p>
        </section>

        {/* Sign Up & Login Section */}
        <section
          id="signup"
          className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Admin */}
          <div className="bg-white shadow-lg rounded-lg p-8 text-center w-full md:w-1/3">
            <h3 className="text-xl font-semibold text-gray-800">
              Admin Access
            </h3>
            <p className="mt-2 text-gray-600">
              Manage hospital operations and patient data with advanced AI
              tools.
            </p>
            <Link
              to={"/login"}
              className="inline-block mt-6 bg-blue-600 text-white py-2 px-6 rounded-full shadow hover:bg-blue-700 transition duration-200"
            >
              Login as Admin
            </Link>
          </div>

          {/* Doctor */}
          <div className="bg-white shadow-lg rounded-lg p-8 text-center w-full md:w-1/3">
            <h3 className="text-xl font-semibold text-gray-800">
              Doctor Access
            </h3>
            <p className="mt-2 text-gray-600">
              Use AI-driven insights to improve patient diagnosis and treatment
              plans.
            </p>
            <Link
              to={"/login"}
              className="inline-block mt-6 bg-blue-600 text-white py-2 px-6 rounded-full shadow hover:bg-blue-700 transition duration-200"
            >
              Login as Doctor
            </Link>
          </div>

          {/* User */}
          <div className="bg-white shadow-lg rounded-lg p-8 text-center w-full md:w-1/3">
            <h3 className="text-xl font-semibold text-gray-800">User Access</h3>
            <p className="mt-2 text-gray-600">
              Remote monitoring for all patients
            </p>
            <Link
              to={"/login"}
              className="inline-block mt-6 bg-blue-600 text-white py-2 px-6 rounded-full shadow hover:bg-blue-700 transition duration-200"
            >
              Login as Remote operator
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Pulse AI. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
