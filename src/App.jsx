import Dashboard from "./pages/Dashboard";
import PatientPage from "./pages/Patient/PatientPage";
import LoginPage from "./pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import Root from "./layout/Root";
import Vitals from "./pages/Patient/Vitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "patient/:id",
        element: <Root />,
        children: [
          {
            path: "",
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
]);

export default router;
