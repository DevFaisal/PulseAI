import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "./Inputs/FormInput";
import Button from "./Inputs/Button";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useFirebase } from "../context/Firebase";
import Wrapper from "./Wrapper";
import toast from "react-hot-toast";

const SignUp = () => {
  const firebase = useFirebase();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const clearError = () => setError("");
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const options = [{ value: "admin", label: "Admin" }];

  const onSubmit = async (data) => {
    data.role = role;
    try {
      // Register user with email and password
      const userCredential = await firebase.SignUpWithEmailAndPassword(
        data.email,
        data.password,
        data.role,
        data.address,
        data.hospitalName
      );
      console.log("User signed up successfully", userCredential);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <header className="flex flex-col items-center justify-center py-8">
        <h1 className="text-6xl font-extrabold text-center">
          Pulse <span className="text-violet-600">AI</span>
        </h1>
        <p className="text-lg mt-4 text-center">
          Create an account to access your dashboard and Pulse AI's intelligent
          solutions.
        </p>
      </header>

      <form
        className="w-full max-w-lg mx-auto flex flex-col gap-4 p-4 md:p-8 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Role Selector */}
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="role"
          >
            Role
          </label>
          <Select
            className="ring-1 ring-gray-300 rounded-lg"
            options={options}
            placeholder="Select your role"
            required={true}
            value={options.find((c) => c.value === role)}
            onChange={(e) => setRole(e.value)}
          />
        </div>

        {/* Form Inputs */}
        <FormInput
          label="Hospital Name"
          type="text"
          placeholder="Hospital Name"
          name="hospitalName"
          register={register}
          error={errors.hospitalName?.message}
        />
        <FormInput
          label="Address"
          type="text"
          placeholder="Hospital Address"
          name="address"
          register={register}
          error={errors.address?.message}
        />
        <FormInput
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="******"
          name="password"
          register={register}
          error={errors.password?.message}
        />

        {/* Error Handling */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Sign Up Button */}
        <Button
          type="submit"
          name="Sign Up"
          className="bg-violet-600 hover:bg-violet-700 text-white w-full py-2 rounded-lg font-semibold shadow-md transition duration-300"
        />
      </form>
    </div>
  );
};

export default SignUp;
