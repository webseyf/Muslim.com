import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const { logIn, logInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await logInWithGoogle();
      navigate("/"); // Redirect to the home page
    } catch (err) {
      setError(err.message || "Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await logIn(email, password);
      navigate("/"); // Redirect to the home page
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back!</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            disabled={loading}
          />
        </div>
        {error && (
          <p className="error" aria-live="assertive">
            {error}
          </p>
        )}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <div className="google-login">
        <p>or log in with</p>
        <button
          onClick={handleGoogleLogin}
          className="google-btn"
          disabled={loading}
        >
          {loading ? "Processing..." : "Log In with Google"}
        </button>
      </div>
      <p>
        <Link to="/reset-password" className="forgot-password">
          Forgot Password?
        </Link>
      </p>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="toggle-auth">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
