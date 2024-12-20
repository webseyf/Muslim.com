// Firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc, // Added setDoc to create a new document if not exists
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAED_I2c_vaNvIMHd016tBqW2VqvHUMXLM",
  authDomain: "aastumuslim.firebaseapp.com",
  projectId: "aastumuslim",
  storageBucket: "aastumuslim.appspot.com",
  messagingSenderId: "319170343352",
  appId: "1:319170343352:web:a15204fe62ebfd0363df4d",
  measurementId: "G-B5D4R6KBLL",
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
const googleProvider = new GoogleAuthProvider();

// Admin email list (you can add multiple admin emails)
const adminEmails = ["admin@gmail.com"];  // Add more admin emails as needed

// Authentication functions
const signUpWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(`Sign-up error: ${error.message}`);
  }
};

const signInWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(`Sign-in error: ${error.message}`);
  }
};

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw new Error(`Google Sign-in error: ${error.message}`);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(`Sign-out error: ${error.message}`);
  }
};

// Listen to Auth State
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log(`Logged in as: ${user.email}`);

    // Check if the user is an admin
    if (adminEmails.includes(user.email)) {
      // Update the user's role in Firestore to admin
      await updateUserRole(user.uid, "admin");
    }
  } else {
    console.log("User logged out");
  }
});

// Firestore functions
const updateUserRole = async (userId, role) => {
  const userRef = doc(db, "users", userId);
  try {
    await updateDoc(userRef, {
      role: role,
    });
    console.log("User role updated:", role);
  } catch (error) {
    console.error("Error updating user role:", error);
  }
};

const saveResource = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "resources"), {
      ...data,
      createdAt: new Date(),
    });
    console.log("Resource added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    throw new Error(`Error saving resource: ${error.message}`);
  }
};

const fetchResources = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "resources"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(`Error fetching resources: ${error.message}`);
  }
};

const saveAnnouncement = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "announcements"), {
      ...data,
      createdAt: new Date(),
    });
    console.log("Announcement added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    throw new Error(`Error saving announcement: ${error.message}`);
  }
};

const fetchAnnouncements = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "announcements"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(`Error fetching announcements: ${error.message}`);
  }
};

const uploadFile = async (filePath, file) => {
  try {
    const fileRef = ref(storage, filePath);
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
};

const checkIfAdmin = async (userId, userEmail) => {
  try {
    // First, check if the email is in the adminEmails list
    if (adminEmails.includes(userEmail)) {
      return true; // User is an admin based on email
    }

    // Check if the user document exists in Firestore
    const docRef = doc(db, "users", userId);
    const userDoc = await getDoc(docRef);

    if (userDoc.exists()) {
      // If the document exists, retrieve the role
      const userData = userDoc.data();
      const role = userData.role;
      console.log("User role:", role);

      if (role === "admin") {
        return true;
      } else {
        return false;
      }
    } else {
      console.log("User document does not exist for uid:", userId);
      return false; // Return false if document does not exist
    }
  } catch (error) {
    console.error("Error checking admin status:", error.message);
    return false; // Return false to avoid breaking the page
  }
};

// Export Firebase services and functions
export {
  auth,
  db,
  storage,
  signUpWithEmailPassword,
  signInWithEmailPassword,
  signInWithGoogle,
  signOutUser,
  saveResource,
  fetchResources,
  saveAnnouncement,
  fetchAnnouncements,
  uploadFile,
  checkIfAdmin,
};
