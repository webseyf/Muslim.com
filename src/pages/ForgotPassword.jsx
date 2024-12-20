import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const { resetPassword } = useAuth(); // Use the resetPassword function from AuthContext
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await resetPassword(email); // Trigger password reset
      setMessage(
        "Password reset email sent! Please check your inbox (and spam folder)."
      );
    } catch (err) {
      setError(err.message || "Failed to send password reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
            required
            disabled={loading}
          />
        </div>
        {error && (
          <p className="error" aria-live="assertive">
            {error}
          </p>
        )}
        {message && (
          <p className="message" aria-live="polite">
            {message}
          </p>
        )}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Sending Email..." : "Send Password Reset Email"}
        </button>
      </form>
      <p>
        Remember your password?{" "}
        <Link to="/login" className="toggle-auth">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
