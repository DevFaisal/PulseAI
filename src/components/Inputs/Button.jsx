import React from "react";

const Button = ({ name, type = "button", onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-300 ease-in-out ${className}`}
    >
      {name}
    </button>
  );
};

export default Button;
