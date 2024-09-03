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
          src="https://img.freepik.com/free-photo/cartoon-ai-robot-scene_23-2151675016.jpg?t=st=1725380494~exp=1725384094~hmac=ce5be1496517176f7ffa89a6d2f34f0a846c7f46a9fa7150562778def7e5c2d3&w=2000"
          alt="Login page background"
        />
      </div>
    </div>
  );
};

export default LoginPage;
