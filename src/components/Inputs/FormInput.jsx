import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormInput = ({
  label,
  type,
  name,
  placeholder,
  register,
  error,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex flex-col p-2 rounded-md">
      <label htmlFor={name} className="font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        {...register(name)}
        className={`bg-white border border-gray-300 rounded-md w-full px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      {type === "password" && (
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute inset-y-0 top-5 right-5 flex items-center"
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
