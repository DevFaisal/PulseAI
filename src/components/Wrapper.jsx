import React, { useEffect } from "react";
import Logo from "./Logo";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const Wrapper = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const firebase = useFirebase();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await firebase.Logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <div className="flex justify-start pl-5 items-center h-16">
        <Logo />
        <button
          onClick={handleLogout}
          className="ml-auto mr-5 font-bold bg-red-300 p-2 rounded-md"
        >
          Logout
        </button>
      </div>
      <div className="container mx-auto p-3 md:p-0 m-0 ">{children}</div>
    </div>
  );
};

export default Wrapper;
