import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormInput = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  register,
  error = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex flex-col p-2 rounded-sm">
      <label
        htmlFor={name}
        className={`font-semibold mb-1 ${
          error ? "text-red-500" : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...(register && register(name))}
        className={`bg-white border w-full px-3 py-2 pr-12 rounded-sm focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
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
