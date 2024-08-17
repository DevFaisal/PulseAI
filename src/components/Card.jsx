import React from "react";

const Card = ({ title, number, color = "bg-gray-400" }) => {
  return (
    <div
      className={`flex flex-col gap-5 h-fit w-full p-4 rounded-md shadow-md ${color} hover:bg-gray-800 duration-500`}
    >
      <h1 className="text-xl font-bold text-white">{title}</h1>
      <p className="text-3xl font-bold text-white">{number}</p>
    </div>
  );
};

export default Card;
