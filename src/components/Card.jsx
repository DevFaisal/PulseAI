import React from "react";
import { NavLink } from "react-router-dom";

const Card = ({ link, title, number, color = "bg-cyan-600" }) => {
  return (
    <NavLink
      to={link}
      className={`flex flex-col gap-3 sm:gap-5 h-30 w-full p-3 sm:p-4 rounded-sm whitespace-nowrap ring-1 ring-gray-600 ${color} hover:bg-gray-800 duration-500 overflow-clip`}
    >
      <h1 className="text-sm sm:text-xl text-wrap font-bold text-white">{title}</h1>
      <p className="text-md sm:text-3xl font-bold text-white">{number}</p>
    </NavLink>
  );
};

export default Card;
