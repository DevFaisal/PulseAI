import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "./Inputs/FormInput";
import Button from "./Inputs/Button";
import { useNavigate } from "react-router-dom";
import credentials from "../lib/credentials";
import Select from "react-select";
import ErrorBanner from "./ErrorBanner";
import { useFirebase } from "../context/Firebase";

const Login = () => {
  const firebase = useFirebase();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      if (firebase.user.role === "user") {
        navigate("/user-dashboard");
      } else if (firebase.user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (firebase.user.role === "doctor") {
        navigate("/doctor-dashboard");
      }
    }
  }, [firebase.isLoggedIn, firebase.user.role]);

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const clearError = () => setError("");

  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });

  const options = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
    { value: "doctor", label: "Doctor" },
  ];

  const onSubmit = async (data) => {
    data.role = value;
    try {
      const result = await firebase.LoginUserWithEmailAndPassword(
        data.email,
        data.password
      );
      const checkRole = await firebase.checkRole(result.user.email);
      console.log("Role is", checkRole);
      if (checkRole === "user") {
        navigate("/user-dashboard");
      } else if (checkRole === "admin") {
        navigate(`/admin-dashboard`);
      } else if (checkRole === "doctor") {
        navigate("/doctor-dashboard");
      }
    } catch (error) {
      console.log(error);
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
          <h2 className="text-2xl font-semibold mb-5">Welcome Back 👋</h2>
          <p>
            Log in to access your dashboard. Enter your credentials for secure
            access to Pulse AI's intelligent solutions.
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
            className=" ring-1 ring-gray-300 rounded-lg"
            options={options}
            placeholder="Select your role"
            required={true}
            value={options.find((c) => c.value === value)}
            onChange={(e) => setValue(e.value)}
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

        <Button type="submit" name="Login" />
      </form>
    </div>
  );
};

export default Login;
