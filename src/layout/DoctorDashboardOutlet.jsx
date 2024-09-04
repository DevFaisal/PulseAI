import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import Menu and X icons from lucide-react
import Logo from "../components/Logo";
import { HospitalIcon } from "lucide-react";
import { useFirebase } from "../context/Firebase";

const DoctorDashboardOutlet = () => {
  const links = [
    { name: "Dashboard", path: "/doctor-dashboard" },
    { name: "Patients", path: "/doctor-dashboard/patients" },
  ];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const firebase = useFirebase();

  const user = firebase.user;

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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-green-900 w-64 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64 lg:fixed lg:top-0 lg:left-0 lg:h-full z-50`}
      >
        <div className="flex items-center justify-between p-4 ">
          <Logo color="white" />
          <button className="text-white lg:hidden" onClick={toggleSidebar}>
            <X />
          </button>
        </div>
        <ul className="flex flex-col gap-3 p-4">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block py-2 px-4 text-white hover:bg-gray-700 ${
                    isActive ? "bg-gray-900 text-violet-600" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white p-2 rounded-lg mt-auto"
          >
            Logout
          </button>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Toggle Button */}
        <button className="lg:hidden p-4 text-gray-900" onClick={toggleSidebar}>
          <Menu />
        </button>

        <header className={`flex bg-red-900 p-5 justify-between items-center`}>
          <h1 className="text-lg text-white md:text-3xl lg:text-4xl font-bold">
            Doctor Dashboard
          </h1>
          <div className="flex gap-2 items-center">
            <HospitalIcon
              color="yellow"
              className="text-xl md:text-2xl lg:text-3xl"
            />
            <h1 className="text-md md:text-xl lg:text-2xl font-bold">
              <span className="text-white">
                {firebase.user.hospitalName || "ABC"}{" "}
              </span>
              <span className="text-red-200">Hospital</span>
            </h1>
          </div>
        </header>
        <main className="bg-white flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboardOutlet;
