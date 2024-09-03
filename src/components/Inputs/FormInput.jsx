import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // You can use any icon library you prefer

const FormInput = ({ label, type, name, placeholder, register, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-2 rounded-md flex flex-col relative">
      <label className="font-semibold">{label}</label>
      <input
        className="bg-white rounded-md border w-96 border-black px-3 py-2 pr-10"
        placeholder={placeholder}
        type={showPassword ? "text" : type}
        {...register(name)}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
      {type === "password" && (
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute right-5 bottom-2 transform -translate-y-1/2 focus:outline-none"
        >
          {showPassword ? (
            <FaEyeSlash color="gray" size={20} />
          ) : (
            <FaEye color="gray" size={20} />
          )}
        </button>
      )}
    </div>
  );
};

export default FormInput;
