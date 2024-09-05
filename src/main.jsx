import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./App.jsx";
import { FirebaseProvider } from "./context/Firebase.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <FirebaseProvider>
    <Toaster />
    <RouterProvider router={router} />
  </FirebaseProvider>
);
