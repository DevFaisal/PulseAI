import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "./Inputs/FormInput";
import Button from "./Inputs/Button";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import ErrorBanner from "./ErrorBanner";
import { useFirebase } from "../context/Firebase";

const SignUp = () => {
  const firebase = useFirebase();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const clearError = () => setError("");
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const options = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
    { value: "doctor", label: "Doctor" },
  ];

  const onSubmit = async (data) => {
    console.log(data);
    data.role = role;
    console.log(
      data.email,
      data.password,
      data.role,
      data.hospitalId,
      data.hospitalName
    );
    try {
      // Register user with email and password
      const userCredential = await firebase.SignUpWithEmailAndPassword(
        data.email,
        data.password,
        data.role,
        data.hospitalId,
        data.hospitalName
      );
      console.log("User signed up successfully", userCredential);
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-around items-center">
      <ErrorBanner error={error} clearError={clearError} />
      <header className="flex flex-col justify-around h-1/2 gap-6">
        <h1 className="text-6xl font-bold text-center whitespace-nowrap">
          Pulse <span className="text-violet-600">AI</span>
        </h1>
        <div className="flex flex-col md:px-44 px-5">
          <h2 className="text-2xl font-semibold mb-5">Sign Up 👋</h2>
          <p>
            Create an account to access your dashboard and Pulse AI's
            intelligent solutions.
          </p>
        </div>
      </header>
      <form
        className="flex p-2 flex-col gap-3 justify-center items-center mb-60"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full p-2">
          <label className="font-semibold" htmlFor="">
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

        <FormInput
          label="Hospital ID"
          type="number"
          placeholder="Hospital ID"
          name="hospitalId"
          register={register}
          error={setError}
        />
        <FormInput
          label="Hospital Name"
          type="text"
          placeholder="Hospital Name"
          name="hospitalName"
          register={register}
          error={setError}
        />
        <FormInput
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          name="email"
          register={register}
          error={setError}
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="******"
          name="password"
          register={register}
          error={setError}
        />

        <Button type="submit" name="Sign Up" />
      </form>
    </div>
  );
};

export default SignUp;
