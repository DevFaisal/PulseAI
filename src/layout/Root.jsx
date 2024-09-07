import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

// A simple loading component
const Loading = () => <div>Loading...</div>;

const Root = () => {
  const { user, isLoading } = useFirebase(); // Assuming isLoading is provided

  if (isLoading) {
    return <Loading />;
  }

  if (!user || user.role !== "user") {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Root;
