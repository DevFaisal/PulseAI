import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./App.jsx";
import { FirebaseProvider } from "./context/FirebaseContext.jsx";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

createRoot(document.getElementById("root")).render(
  <FirebaseProvider>
    <Suspense fallback={<div>Loading...</div>}>
      <Toaster />
      <RouterProvider router={router} />
    </Suspense>
  </FirebaseProvider>
);
