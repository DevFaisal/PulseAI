import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import Logo from "../components/Logo";
import { Hospital, HospitalIcon } from "lucide-react";
import hospitals from "../lib/hospital";
import { useFirebase } from "../context/Firebase";

const AdminDashboardOutlet = ({ Hospital = "PulseAI" }) => {
  const navigate = useNavigate();
  const links = [
    { name: "Patients", path: "/admin-dashboard/patients" },
    { name: "Doctors", path: "/admin-dashboard/doctors" },
  ];
  const firebase = useFirebase();

  const handleLogOut = async () => {
    try {
      await firebase.Logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <div className="flex">
      <aside className="bg-gray-800 w-64 min-h-screen p-3">
        <div className="mb-2 p-4">
          <Logo color="white" />
        </div>
        <ul className="flex flex-col gap-3">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                activeClassName="bg-gray-900 text-white"
                className={({ isActive }) =>
                  `"block py-2 px-4 text-white hover:bg-gray-900" ${
                    isActive ? "p-4 bg-gray-900 text-violet-600" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white p-2 rounded-lg"
          >
            Logout
          </button>
        </ul>
      </aside>
      <aside className="bg-gray-200 w-full min-h-screen">
        <header className="flex bg-violet-300 p-5 justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <HospitalIcon />
            <h1 className="text-xl font-bold">
              <span>{firebase.user.hospitalName || "ABC"} </span>
              <span className="text-red-600">Hospital</span>
            </h1>
          </div>
        </header>
        <section className="bg-white mx-auto h-fit">
          <Outlet />
        </section>
      </aside>
    </div>
  );
};

export default AdminDashboardOutlet;
