import React from "react";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div className="max-w-full flex flex-col sm:flex-row h-screen max-h-screen">
      <div className="flex justify-center items-center  h-full w-full sm:w-1/2">
        <Login />
      </div>
      <div className="sm:flex bg-contain justify-center items-center bg-yellow-400 h-full w-full sm:w-1/2">
        <img
          className="object-cover w-full h-full md:flex hidden "
          src="https://img.freepik.com/free-vector/ai-healthcare-concept-illustration_114360-25683.jpg?w=1480&t=st=1725719388~exp=1725719988~hmac=c5c6c8edb356ab12b37842ad53aac53b32eb66155aa7b718fdbba909748475bb"
          alt="Login page background"
        />
      </div>
    </div>
  );
};

export default LoginPage;
