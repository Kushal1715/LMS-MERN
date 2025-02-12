import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RouteGuard = ({ isAuthenticated, user, element }) => {
  console.log(isAuthenticated, user);
  const location = useLocation();

  if (!isAuthenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  if (
    isAuthenticated &&
    user.role === "instructor" &&
    !location.pathname.includes("/instructor")
  ) {
    return <Navigate to="/instructor" />;
  }

  if (
    isAuthenticated &&
    user.role !== "instructor" &&
    (location.pathname.includes("/instructor") ||
      location.pathname.includes("/auth"))
  ) {
    return <Navigate to="/home" />;
  }

  return <>{element}</>;
};

export default RouteGuard;
