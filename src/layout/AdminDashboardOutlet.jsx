import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import Logo from "../components/Logo";
import { HospitalIcon } from "lucide-react";
import { useFirebase } from "../context/Firebase";

const AdminDashboardOutlet = ({
  headerTitle = "Admin Dashboard",
  sidebarColor = "bg-gray-900",
  bannerColor = "bg-sky-600",
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const firebase = useFirebase();

  const links = [
    { name: "Dashboard", path: "/admin-dashboard" },
    { name: "Patients", path: "/admin-dashboard/patients" },
    { name: "Doctors", path: "/admin-dashboard/doctors" },
    { name: "Users", path: "/admin-dashboard/users" },
  ];

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
        className={`fixed top-0 left-0 h-full ${sidebarColor} w-64 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64 lg:fixed lg:top-0 lg:left-0 lg:h-full z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <Logo color="white" />
          <button className="text-white lg:hidden" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col gap-2 p-4">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded-lg text-white hover:bg-gray-700 ${
                    isActive ? "bg-gray-900 text-violet-300" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white p-2 rounded-lg mt-auto flex items-center gap-2"
          >
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Toggle Button */}
        <button className="lg:hidden p-4 text-gray-900" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>

        <header
          className={`flex ${bannerColor} p-3 md:p-4 justify-between items-center`}
        >
          <h1 className="text-lg text-white md:text-xl lg:text-2xl font-bold">
            {headerTitle}
          </h1>
          <div className="flex items-center gap-4">
            <HospitalIcon
              color="yellow"
              className="text-xl md:text-2xl lg:text-3xl"
            />
            <div className="flex flex-col text-white">
              <h2 className="text-sm md:text-md lg:text-lg font-semibold">
                {firebase.user.hospitalName || "ABC"}{" "}
                <span className="text-red-200">Hospital</span>
              </h2>
              <span className="text-xs md:text-sm lg:text-md">
                {firebase.user.hospitalLocation || "Location"}
              </span>
            </div>
          </div>
        </header>
        <main className="bg-gray-50 flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardOutlet;
