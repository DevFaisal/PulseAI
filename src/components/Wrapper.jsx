import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Wrapper = ({ children }) => {
  const firebase = useFirebase();
  const user = firebase.user;
  const [hospital, setHospital] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchHospitalName = async () => {
      try {
        const hospital = await firebase.getHospitalName(
          firebase.user?.hospitalId
        );

        setHospital(hospital);
      } catch (error) {
        console.error("Failed to fetch hospital name", error);
      }
    };
    fetchHospitalName();
  }, []);

  const navigate = useNavigate();
  const handleLogout = async () => {
    await firebase.Logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <div className="flex justify-between pl-5 items-center h-16">
        <Logo />

        <div className="flex font-semibold items-center text-xl gap-2">
          <h2>
            {hospital.name}{" "}
            <span className="text-xl font-bold text-red-500">Hospital</span>
          </h2>
          <button
            onClick={handleLogout}
            className="ml-auto mr-5 font-bold  p-2 rounded-md"
          >
            <LogOut strokeWidth={3} />{" "}
          </button>
        </div>
      </div>
      <div className="container mx-auto py-4 md:p-0 m-0 ">{children}</div>
    </div>
  );
};

export default Wrapper;
