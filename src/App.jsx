import Dashboard from "./pages/Dashboard";
import PatientPage from "./pages/Patient/PatientPage";
import LoginPage from "./pages/LoginPage";
import Vitals from "./pages/Patient/Vitals";
import { createBrowserRouter } from "react-router-dom";
import Root from "./layout/Root";

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
]);

export default router;
