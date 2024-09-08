import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BriefcaseMedical, LogOut, Menu, X } from "lucide-react"; // Import Menu and X icons from lucide-react
import Logo from "../components/Logo";
import { HospitalIcon } from "lucide-react";
import { useFirebase } from "../context/Firebase";
import Loading from "../components/Loading";

const DoctorDashboardOutlet = () => {
  const links = [
    { name: "Dashboard", path: "/doctor-dashboard" },
    { name: "Patients", path: "/doctor-dashboard/patients" },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [hospital, setHospital] = useState("");
  const [loading, setLoading] = useState(true);
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
        const Loading = firebase.isLoading;

        setDoctor(doctor);
        setHospital(hospital);
        setLoading(Loading);
      } catch (error) {
        console.error("Failed to fetch hospital name", error);
      }
    };
    fetchHospitalName();
  }, [firebase, user.email]);

  if (user.role !== "doctor") {
    navigate("/");
    return null;
  }
  if (loading) {
    return <Loading />;
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
    <div className="flex overflow-hidden h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-slate-900 w-64 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64 lg:fixed lg:top-0 lg:left-0 lg:h-full z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
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

        <header className="flex bg-white text-gray-800 px-4 h-16 py-2 border-b border-gray-300 justify-between items-center shadow-md">
          <div className="flex items-center gap-2">
            <BriefcaseMedical color="red" size={28} strokeWidth={2} />
            <h2 className="text-xl md:text-2xl font-bold">Doctor Dashboard</h2>
          </div>
          <div className="flex gap-4 items-center">
            <HospitalIcon color="#4B5563" size={24} />
            <div className="flex flex-col">
              <div className="text-md font-semibold">
                <span>{hospital.name || "ABC"} </span>
                <span className="text-red-400">Hospital</span>
              </div>
              <span className="hidden md:flex text-sm">
                {hospital.location}
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="flex justify-end px-2 mb-4">
            <h1 className="text-xl text-gray-800">
              Welcome{" "}
              <span className="text-sky-600 font-semibold">{doctor?.name}</span>
            </h1>
          </div>

          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboardOutlet;
