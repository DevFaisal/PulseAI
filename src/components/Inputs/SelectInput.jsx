import React from "react";
import Select from "react-select";

const SelectInput = ({
  label,
  options,
  value,
  onChange,
  required = false,
  placeholder,
  error = false,
}) => {
  return (
    <div className="flex flex-col p-2">
      {label && (
        <label className="font-semibold text-gray-700 mb-1">{label}</label>
      )}
      <Select
        options={options}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        classNamePrefix="react-select"
        className={`border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default SelectInput;
