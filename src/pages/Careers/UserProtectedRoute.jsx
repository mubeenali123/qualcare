import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const UserProtectedRoute = () => {
  const { role, token } = useSelector(state => state.auth);
  const location = useLocation();

  const storedToken = localStorage.getItem("authToken");
  const storedRole = localStorage.getItem("authRole");

  const isApplicant = (role === 'applicant' || storedRole === 'applicant') && (token || storedToken);

  if (!isApplicant) {
    sessionStorage.setItem('redirectAfterLogin', location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;