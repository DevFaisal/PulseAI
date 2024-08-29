import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "./Inputs/FormInput";
import Button from "./Inputs/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col h-screen justify-around items-center">
        <header className="flex flex-col justify-around h-1/2 gap-6">
          <h1 className="text-6xl font-bold text-center whitespace-nowrap">
            Pulse <span className="text-violet-600">AI</span>{" "}
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
          className="flex flex-col gap-3 justify-center items-center mb-60"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            label={"Email"}
            type={"email"}
            placeholder={"example@gmail.com"}
            name={"email"}
          />
          <FormInput
            label={"Password"}
            type={"password"}
            placeholder={"******"}
            name={"password"}
          />
          <Button
            onClick={() => {
              navigate("/dashboard");
            }}
            type={"submit"}
            name={"Login"}
          />
        </form>
      </div>
    </>
  );
};

export default Login;
