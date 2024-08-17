import React from "react";
import { useForm } from "react-hook-form";

const FormInput = ({ label, type, name, placeholder }) => {
  const { register } = useForm();
  return (
    <div className="p-2 rounded-md flex flex-col">
      <label className="font-semibold">{label}</label>
      <input
        className=" bg-white rounded-md border w-96 border-black px-3 py-2"
        placeholder={placeholder}
        type={type}
        {...register(name)}
      />
    </div>
  );
};

export default FormInput;
