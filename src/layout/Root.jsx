import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Loading from "../components/Loading";

const Root = () => {
  const [loading, setLoading] = useState(true);

  const { user, isLoading } = useFirebase();

  useEffect(() => {
    setLoading(isLoading);
  }, [user, isLoading]);

  if (loading) {
    return <Loading />;
  }

  if (!user || user.role !== "user") {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Root;
