import React, { useEffect } from "react";
import toast from "react-hot-toast";

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
    <div>
      {toast.error(error, {
        duration: 5000,
        position: "top-right",
        style: {
          backgroundColor: "#dc2626",
          color: "#fff",
        },
      })}
    </div>
  );
};

export default ErrorBanner;
