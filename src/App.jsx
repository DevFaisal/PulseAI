import Dashboard from "./pages/Dashboard";
import PatientPage from "./pages/Patient/PatientPage";
import LoginPage from "./pages/LoginPage";
import Vitals from "./pages/Patient/Vitals";
import Root from "./layout/Root";
import { createBrowserRouter } from "react-router-dom";

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
