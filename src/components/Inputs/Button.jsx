import React from "react";

const Button = ({ name, type }) => {
  return (
    <button
      type={type}
      className="px-3 py-2 rounded-md w-96 text-white bg-violet-600"
    >
      {name}
    </button>
  );
};

export default Button;
