import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ color = "gray-800" }) => {
  return (
    <Link to={"/"}>
      <h1 className="flex text-3xl font-bold">
        <h1 className={`text-${color}`}>Pulse</h1>
        <span className="text-violet-500"> AI</span>
      </h1>
    </Link>
  );
};

export default Logo;
