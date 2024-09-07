import React from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/User/Dashboard";
import PatientPage from "./pages/User/Patient/PatientPage";
import Vitals from "./pages/User/Patient/Vitals";
import Root from "./layout/Root";
import { createBrowserRouter } from "react-router-dom";
import AdminDashboardOutlet from "./layout/AdminDashboardOutlet";
import ManageDoctors from "./pages/Admin/ManageDoctors";
import AdminPatients from "./pages/Admin/AdminPatients";
import SignUp from "./components/SignUp";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorDashboardOutlet from "./layout/DoctorDashboardOutlet";
import ManageUsers from "./pages/Admin/ManageUsers";
import DoctorPatients from "./pages/Doctor/DoctorPatients";
import NotFound from "./pages/NotFound";
import LandingPage from "./components/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/user-dashboard",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "patient/:id",
        element: <Root />,
        children: [
          {
            index: true,
            element: <PatientPage />,
          },
          {
            path: "vitals",
            element: <Vitals />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboardOutlet />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "patients",
        element: <AdminPatients />,
      },
      {
        path: "doctors",
        element: <ManageDoctors />,
      },
      {
        path: "users",
        element: <ManageUsers />,
      },
    ],
  },
  {
    path: "/doctor-dashboard",
    element: <DoctorDashboardOutlet />,
    children: [
      {
        index: true,
        element: <DoctorDashboard />,
      },
      {
        path: "patients",
        element: <DoctorPatients />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
