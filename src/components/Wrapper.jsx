import React from "react";
import Logo from "./Logo";

const Wrapper = ({ children }) => {
  return (
    <div className="flex flex-col justify-center gap-2 max-w-auto p-4 bg-gray-200 h-screen">
      <div className="p-1">
        <Logo />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Wrapper;
