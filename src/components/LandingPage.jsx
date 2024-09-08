// src/LandingPage.js
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const links = [
    {
      title: "Admin",
      description:
        "Manage hospital operations and patient data with advanced AI tools.",
      link: "/login",
    },
    {
      title: "Doctor",
      description:
        "Use AI-driven insights to improve patient diagnosis and treatment plans.",
      link: "/login",
    },
    {
      title: "Remote Operator",
      description:
        "Access remote patient care tools and personalized health insights.",
      link: "/login",
    },
  ];

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-gray-700 to-slate-800 text-white py-16 px-4 sm:px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl flex sm:flex-row justify-center gap-3 flex-col font-bold leading-tight">
          Welcome to{" "}
          <span className="text-violet-500 bg-white px-3 py-1 rounded-md shadow-md">
            Pulse AI
          </span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
          Revolutionizing Healthcare with Advanced AI Solutions for Hospitals
        </p>
        <div className="mt-8">
          <Link
            to={"/login"}
            className="inline-block bg-violet-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-lg hover:bg-violet-700 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Features and Sign-Up/Login */}
      <main className="py-12 px-4 sm:px-6 flex-1">
        <section className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
            AI-Driven Healthcare Solutions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
            Pulse AI empowers healthcare providers with AI-driven solutions for
            real-time monitoring, chronic disease management, post-op care, and
            cancer treatment. Enhance patient outcomes with seamless,
            personalized care—anytime, anywhere.
          </p>
        </section>

        {/* Sign Up & Login Section */}
        <section
          id="signup"
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {links.map((link) => (
            <Qube
              key={link.title}
              title={link.title}
              description={link.description}
              link={link.link}
            />
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Pulse AI. All Rights Reserved.
        </p>
        <p className="mt-2">
          <Link
            to="/contact"
            className="text-violet-500 hover:text-violet-400 transition duration-200"
          >
            Contact Us
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;

export function Qube({ title, description, link }) {
  return (
    <div
      className="bg-white flex flex-col justify-between  rounded-md p-6 text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl 
      w-full mx-auto md:mx-0 my-4"
    >
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
          {title}
        </h3>
        <p className="text-sm md:text-base text-gray-700 mb-6">{description}</p>
      </div>
      <Link
        to={link}
        className="inline-flex justify-center mt-4 bg-violet-600 text-white py-3 px-5 md:px-8 rounded-full shadow-md hover:bg-violet-700 transition-all duration-300"
      >
        Login as {title}
      </Link>
    </div>
  );
}
