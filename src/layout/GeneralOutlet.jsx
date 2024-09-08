import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

const GeneralOutlet = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState(null);
  const firebaseContext = useFirebase();

  useEffect(() => {
    // Simulate fetching data from Firebase
    const checkAuth = async () => {
      try {
        const isLoggedIn = firebaseContext.isLoggedIn;
        const userRole = firebaseContext.user?.role;
        const Loading = firebaseContext.isLoading;

        setAuth(isLoggedIn);
        setRole(userRole);
        setLoading(Loading);
      } catch (error) {
        toast.error("Failed to check authentication", error);
      }
    };

    checkAuth();
  }, [firebaseContext]);

  if (loading) {
    return <Loading />;
  }

  if (auth) {
    switch (role) {
      case "user":
        return <Navigate to="/user-dashboard" />;
      case "admin":
        return <Navigate to="/admin-dashboard" />;
      case "doctor":
        return <Navigate to="/doctor-dashboard" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default GeneralOutlet;
