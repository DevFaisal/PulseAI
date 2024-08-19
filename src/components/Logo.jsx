import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <h1 className="text-3xl font-bold">
        Pulse<span className="text-violet-500"> AI</span>
      </h1>
    </Link>
  );
};

export default Logo;
