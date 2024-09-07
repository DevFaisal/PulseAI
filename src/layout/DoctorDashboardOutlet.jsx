import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react"; // Import Menu and X icons from lucide-react
import Logo from "../components/Logo";
import { HospitalIcon } from "lucide-react";
import { useFirebase } from "../context/Firebase";

const DoctorDashboardOutlet = () => {
  const links = [
    { name: "Dashboard", path: "/doctor-dashboard" },
    { name: "Patients", path: "/doctor-dashboard/patients" },
  ];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [hospital, setHospital] = useState("");
  const navigate = useNavigate();

  const firebase = useFirebase();
  const user = firebase.user;

  useEffect(() => {
    const fetchHospitalName = async () => {
      try {
        const hospital = await firebase.getHospitalName(
          firebase.user?.hospitalId
        );
        const doctor = await firebase.getDoctorByEmail(user.email);
        setDoctor(doctor);
        setHospital(hospital);
      } catch (error) {
        console.error("Failed to fetch hospital name", error);
      }
    };
    fetchHospitalName();
  }, [firebase]);

  if (user.role !== "doctor") {
    navigate("/");
    return null;
  }
  const handleLogOut = async () => {
    try {
      await firebase.Logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-slate-900 w-64 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64 lg:fixed lg:top-0 lg:left-0 lg:h-full z-50`}
      >
        <div className="flex items-center justify-between p-4">
          <Logo color="white" />
          <button className="text-white lg:hidden" onClick={toggleSidebar}>
            <X />
          </button>
        </div>
        <div className=" flex flex-col h-[93vh] justify-between">
          <ul className="flex-1">
            {links.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block py-2 px-4 text-white hover:bg-gray-700 ${
                      isActive ? "bg-gray-500 text-black" : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <button onClick={handleLogOut} className="mb-10 text-white p-2">
            <LogOut />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Toggle Button */}
        <button className="lg:hidden p-4 text-gray-900" onClick={toggleSidebar}>
          <Menu />
        </button>

        <header
          className={`flex bg-white text-black px-2 h-14 py-1 border-b border-gray-300 justify-between items-center`}
        >
          <h1 className="text-md md:text-xl lg:text-2xl font-bold">
            Doctor Dashboard
          </h1>
          <div className="flex gap-2 items-start">
            <HospitalIcon color="white" size={20} className="mt-1" />
            <div className="flex flex-col">
              <div className="text-sm md:text-md lg:text-xl font-bold">
                <span>{hospital.name || "ABC"} </span>
                <span className="text-red-400">Hospital</span>
              </div>
              <span className="text-xs md:text-sm ">{hospital.location}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-2 overflow-y-auto">
          <div className="flex justify-end px-2">
            <h1 className="text-xl  text-gray-800 mb-4">
              Welcome{" "}
              <span className="text-sky-600 font-semibold">{doctor?.name}</span>
            </h1>
          </div>

          <div className="p-3">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboardOutlet;
