import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserProtectedRoute = () => {
  const { user, role } = useSelector(state => state.auth);

  // Check if user exists AND if they have the correct role
  // This ensures an Admin can't just stumble into the User Profile
  if (!user || role !== 'applicant') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;