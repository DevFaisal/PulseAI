import React, { useEffect } from "react";

const ErrorBanner = ({ error, clearError }) => {
  useEffect(() => {
    if (error && error.length > 4) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  if (!error || error.length <= 4) return null;

  return (
    <header
      className="absolute top-0 w-full right-0 text-center p-2 bg-red-600 text-white"
      style={{
        animation:
          "slideDown 0.5s ease-out, fadeIn 0.5s ease-out, fadeOut 0.5s 4.5s, slideUp 0.5s 4.5s",
      }}
    >
      <h1 className="text-white text-sm md:text-md font-bold">{error}</h1>
    </header>
  );
};

export default ErrorBanner;
