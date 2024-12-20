// PrivateRoute.jsx

import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const { userRole } = useAuth();

  return (
    <Route
      {...rest}
      element={
        userRole === role ? (
          <Component />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
