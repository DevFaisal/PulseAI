import React from "react";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div className="max-w-full flex flex-col sm:flex-row h-screen max-h-screen">
      <div className="flex justify-center items-center bg-white h-full w-full sm:w-1/2">
        <Login />
      </div>
      <div className="sm:flex bg-contain justify-center items-center bg-yellow-400 h-full w-full sm:w-1/2">
        <img
          className="object-cover w-full h-full md:flex hidden "
          src="https://plus.unsplash.com/premium_photo-1699387227141-04951848a45a?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login page background"
        />
      </div>
    </div>
  );
};

export default LoginPage;
