import React from "react";

const Button = ({ name, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="px-3 py-2 rounded-md w-96 text-white bg-violet-600 hover:bg-slate-700"
    >
      {name}
    </button>
  );
};

export default Button;
