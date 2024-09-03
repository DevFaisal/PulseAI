import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./App.jsx";
import { FirebaseProvider } from "./context/Firebase.jsx";

createRoot(document.getElementById("root")).render(
  <FirebaseProvider>
    <RouterProvider router={router} />
  </FirebaseProvider>
);
