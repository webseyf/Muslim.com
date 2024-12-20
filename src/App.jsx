// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/Authcontext"
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          {/* Protect admin route */}
          <PrivateRoute path="/admin-dashboard" component={AdminDashboard} role="admin" />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
