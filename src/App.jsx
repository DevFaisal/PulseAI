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

const router = createBrowserRouter([
  {
    path: "/",
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
        path: "patients",
        element: <AdminPatients />,
      },
      {
        path: "doctors",
        element: <ManageDoctors />,
      },
    ],
  },
]);

export default router;
