import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import { auth } from "../services/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import Loader from "../components/Loader";
import { checkIfAdmin } from "../services/config"; // Updated admin check function

// Create the AuthContext
export const AuthContext = createContext();

// Custom Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Firebase error message mapper
const getErrorMessage = (errorCode) => {
  const errorMessages = {
    "auth/email-already-in-use": "The email is already in use. Please sign in.",
    "auth/invalid-email": "Invalid email format.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/popup-closed-by-user": "The sign-in popup was closed. Try again.",
  };
  return errorMessages[errorCode] || "An unexpected error occurred. Please try again.";
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Track the logged-in user
  const [userRole, setUserRole] = useState("user"); // Track user roles
  const [loading, setLoading] = useState(true); // Loading state

  // Listener for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true); // Start loading
      if (user) {
        setCurrentUser(user);
        try {
          const role = await checkIfAdmin(user.uid); // Check if user is admin
          setUserRole(role); // Set role based on admin check
        } catch (error) {
          setUserRole("user"); // Default to user if admin check fails
        }
      } else {
        setCurrentUser(null);
        setUserRole("user"); // Default to "user" if no user is logged in
      }
      setLoading(false); // Stop loading when done
    });
  
    return unsubscribe; // Clean up listener on unmount
  }, []);
  
  
  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    currentUser,
    userRole,
    signUp: async (email, password) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error) {
        throw new Error(getErrorMessage(error.code));
      }
    },
    logIn: async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error) {
        throw new Error(getErrorMessage(error.code));
      }
    },
    logInWithGoogle: async () => {
      const googleProvider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
      } catch (error) {
        throw new Error(getErrorMessage(error.code));
      }
    },
    logOut: async () => {
      try {
        await signOut(auth);
      } catch (error) {
        throw new Error("Failed to log out. Please try again.");
      }
    },
    resetPassword: async (email) => {
      try {
        await sendPasswordResetEmail(auth, email);
      } catch (error) {
        throw new Error(getErrorMessage(error.code));
      }
    },
  }), [currentUser, userRole]);

  // Return the AuthProvider with a loading fallback
  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
