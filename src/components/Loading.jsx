import React from "react";
import Logo from "./Logo";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col justify-center items-center space-y-4">
        {/* Pulsing loader */}
        <div className="relative">
          <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-75"></div>
          <div className="relative rounded-full h-32 w-32 bg-violet-500 flex items-center justify-center">
            <span className="text-white text-3xl font-bold">AI</span>
          </div>
        </div>

        {/* Loading text */}
        <Logo />
        <div className="text-gray-600 text-lg">Please wait, loading...</div>
      </div>
    </div>
  );
};

export default Loading;
