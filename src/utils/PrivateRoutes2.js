import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.js";

const PrivateRoutes = () => {
  const { currentUser, loading } = useContext(AuthContext);
  const location = useLocation();

  const checkAuth = () => {
    if (!currentUser) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    return <Outlet />;
  };
  return loading ? <></> : checkAuth();
};

export default PrivateRoutes;
