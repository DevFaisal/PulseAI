import React, { useEffect } from "react";
import Logo from "./Logo";

const Wrapper = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <div className="flex justify-start pl-5 items-center h-16">
        <Logo />
      </div>
      <div className="container mx-auto p-3 md:p-0 m-0 ">{children}</div>
    </div>
  );
};

export default Wrapper;
