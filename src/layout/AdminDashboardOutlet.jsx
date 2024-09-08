import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, ShieldHalf } from "lucide-react";
import Logo from "../components/Logo";
import { HospitalIcon } from "lucide-react";
import { useFirebase } from "../context/Firebase";
import Loading from "../components/Loading";

const AdminDashboardOutlet = ({ sidebarColor = "bg-gray-900" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const firebase = useFirebase();
  const auth = firebase.isLoggedIn;
  const role = firebase.user.role;

  const links = [
    { name: "Dashboard", path: "/admin-dashboard" },
    { name: "Patients", path: "/admin-dashboard/patients" },
    { name: "Doctors", path: "/admin-dashboard/doctors" },
    { name: "Users", path: "/admin-dashboard/users" },
  ];

  useEffect(() => {
    const Loading = firebase.isLoading;
    setLoading(Loading);
  }, []);

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
  if (loading) {
    <Loading />;
  }
  if (!auth || role !== "admin") {
    navigate("/");
    return null;
  }

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
        <div className="flex flex-col h-[calc(100vh-800px)] md:h-[calc(100vh-56px)] justify-between p-4">
          <ul className="flex-1 space-y-2">
            {links.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded-md text-white hover:bg-gray-700 ${
                      isActive ? "bg-gray-600" : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            onClick={handleLogOut}
            className="text-white flex items-center gap-2 p-2 mt-4 hover:bg-gray-700 rounded-md"
          >
            <LogOut size={24} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Toggle Button */}
        <button className="lg:hidden p-4 text-gray-900" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>

        <header className="flex bg-cyan-800 text-gray-800 px-4 h-16 py-2 border-b border-gray-300 justify-between items-center shadow-md">
          <div className="flex gap-2 items-center">
            <ShieldHalf color="white" size={28} strokeWidth={3} />
            <h1 className="text-lg text-white md:text-xl lg:text-2xl font-bold">
              Admin Dashboard
            </h1>
          </div>

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
