// import { useState } from "react";
// import { db } from "../services/config";
// import {
//   collection,
//   addDoc,
//   deleteDoc,
//   doc,
//   getDoc,
//   getDocs,
//   updateDoc,
//   query,
//   orderBy,
//   where,
//   Timestamp,
// } from "firebase/firestore";

// // Helper function to handle Firestore operations with loading and error states
// const firestoreAction = async (action, setLoading, setError) => {
//   try {
//     setLoading(true);
//     setError(null);
//     return await action();
//   } catch (err) {
//     setError(err.message || "An error occurred");
//     console.error("Firestore operation error:", err);
//   } finally {
//     setLoading(false);
//   }
// };

// // Custom hook for managing Firestore operations
// export const useFirestore = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const postsRef = collection(db, "posts");
//   const commentsRef = collection(db, "comments");

//   // Fetch all posts (ordered by creation date)
//   const fetchPosts = async () => {
//     return await firestoreAction(async () => {
//       try {
//         const q = query(postsRef, orderBy("createdAt", "desc"));
//         const snapshot = await getDocs(q);

//         if (snapshot.empty) {
//           console.warn("No posts found in Firestore.");
//           return [];
//         }

//         return snapshot.docs.map((doc) => {
//           const data = doc.data();
//           if (!data.createdAt) {
//             console.warn(`Document ${doc.id} is missing 'createdAt' field.`);
//           }
//           return {
//             id: doc.id,
//             ...data,
//             createdAt: data.createdAt ? data.createdAt.toDate() : null,
//           };
//         });
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         throw error;
//       }
//     }, setLoading, setError);
//   };

//   // Fetch a single post by ID
//   const fetchPostById = async (postId) => {
//     return await firestoreAction(async () => {
//       const docRef = doc(postsRef, postId);
//       const docSnap = await getDoc(docRef);
//       return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
//     }, setLoading, setError);
//   };

//   // Fetch comments for a specific post
//   const fetchComments = async (postId) => {
//     return await firestoreAction(async () => {
//       const q = query(
//         commentsRef,
//         where("postId", "==", postId),
//         orderBy("createdAt", "desc")
//       );
//       const snapshot = await getDocs(q);
//       return snapshot.empty
//         ? []
//         : snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     }, setLoading, setError);
//   };

//   // Add a comment to a post
//   const addComment = async (postId, commentData) => {
//     return await firestoreAction(async () => {
//       await addDoc(commentsRef, {
//         ...commentData,
//         postId,
//         createdAt: Timestamp.now(),
//       });
//     }, setLoading, setError);
//   };

//   // Fetch posts created by a specific user
//   const fetchUserPosts = async (email) => {
//     return await firestoreAction(async () => {
//       const q = query(
//         postsRef,
//         where("email", "==", email),
//         orderBy("createdAt", "desc")
//       );
//       const snapshot = await getDocs(q);
//       return snapshot.empty
//         ? []
//         : snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     }, setLoading, setError);
//   };

//   // Add a new post
//   const addPost = async (postData) => {
//     return await firestoreAction(async () => {
//       await addDoc(postsRef, {
//         ...postData,
//         createdAt: Timestamp.now(),
//       });
//     }, setLoading, setError);
//   };

//   // Delete a post by ID
//   const deletePost = async (postId) => {
//     return await firestoreAction(async () => {
//       await deleteDoc(doc(postsRef, postId));
//     }, setLoading, setError);
//   };

//   // Update an existing post
//   const updatePost = async (postId, updatedData) => {
//     return await firestoreAction(async () => {
//       await updateDoc(doc(postsRef, postId), updatedData);
//     }, setLoading, setError);
//   };

//   return {
//     fetchPosts,
//     fetchPostById,
//     fetchComments,
//     fetchUserPosts,
//     addComment,
//     addPost,
//     deletePost,
//     updatePost,
//     loading,
//     error,
//   };
// };
