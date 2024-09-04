import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const Root = () => {
  const user = useFirebase().user;

  if (user.role === "user") {
    return (
      <div>
        <Outlet />
      </div>
    );
  }
  return <Navigate to="/" />;
};

export default Root;
