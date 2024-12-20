import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom"; // Use Navigate from react-router-dom v6

const AdminDashboard = () => {
  const { userRole } = useAuth();

  // If the user is not an admin, navigate them to the home page
  if (userRole !== "admin") {
    return <Navigate to="/" />; // Redirect using Navigate instead of Redirect
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin-specific content */}
      <p>Welcome to the Admin Dashboard</p>
    </div>
  );
};

export default AdminDashboard;
