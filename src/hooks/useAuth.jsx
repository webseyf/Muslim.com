import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Ensure path is consistent

/**
 * Custom hook to access the AuthContext
 * Provides authentication-related values and methods across the app.
 */
export const useAuth = () => {
  // Access the AuthContext using React's useContext hook
  const context = useContext(AuthContext);

  // Ensure the hook is used within the AuthProvider
  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider. Ensure your component is wrapped in <AuthProvider>."
    );
  }

  // Return the AuthContext values (e.g., currentUser, logIn, signUp)
  return context;
};
