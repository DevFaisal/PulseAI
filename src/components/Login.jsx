import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "./Inputs/FormInput";
import Button from "./Inputs/Button";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import ErrorBanner from "./ErrorBanner";
import { useFirebase } from "../context/Firebase";
import { HospitalIcon } from "lucide-react";

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  const options = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
    { value: "doctor", label: "Doctor" },
  ];

  const clearError = () => setError("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      switch (firebase.user.role) {
        case "user":
          navigate("/user-dashboard");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "doctor":
          navigate("/doctor-dashboard");
          break;
        default:
          break;
      }
    }
  }, [firebase.isLoggedIn, firebase.user.role, navigate]);

  const onSubmit = async (data) => {
    data.role = role;
    console.log("Login data:", data);
    try {
      const result = await firebase.LoginUserWithEmailAndPassword(
        data.email,
        data.password,
        data.role
      );
      console.log("User logged in successfully", result);
      const userRole = await firebase.checkRole(result.user.email);
      switch (userRole) {
        case "user":
          navigate("/user-dashboard");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "doctor":
          navigate("/doctor-dashboard");
          break;
        default:
          throw new Error("Invalid user role");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "An error occurred during login.");
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center p-4">
      <ErrorBanner error={error} clearError={clearError} />
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          <span className="text-violet-600">Pulse</span> AI
        </h1>
        <p className="text-lg text-gray-700 max-w-md mx-auto">
          Log in to access your dashboard. Enter your credentials for secure
          access to Pulse AI's intelligent solutions.
        </p>
      </header>
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg ring-1 ring-violet-300"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-6">
          <label className="block text-gray-700 text-md font-semibold mb-2">
            Login As
          </label>
          <Select
            className="w-full rounded-md border-gray-300 shadow-sm focus:ring-violet-500 focus:border-violet-500"
            options={options}
            placeholder="Select your role"
            required
            value={options.find((c) => c.value === role)}
            onChange={(option) => setRole(option.value)}
          />
        </div>

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

        <Button type="submit" name="Login" className="w-full mt-4" />
      </form>
    </div>
  );
};

export default Login;
