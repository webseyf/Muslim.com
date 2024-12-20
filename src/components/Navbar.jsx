// import React, { useState, useCallback } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth.jsx";
// import { FaBars, FaTimes } from "react-icons/fa";
// import "../styles/Navbar.css";

// const Navbar = () => {
//   const { currentUser, logOut } = useAuth(); // Get user authentication details
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Toggle menu state (for mobile)
//   const toggleMenu = useCallback(() => {
//     setIsMenuOpen((prev) => !prev);
//   }, []);

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         {/* Logo */}
//         <div className="navbar-logo">
//           <a href="/"><h1>later</h1></a>
//         </div>

//         {/* Watch Now Button */}
//         <button className="watch-now">
//           <NavLink to="/" className="watch-link">
//             All Posts
//           </NavLink>
//         </button>

//         {/* Menu Toggle Icon */}
//         <div
//           className="menu-toggle"
//           onClick={toggleMenu}
//           aria-label="Toggle navigation menu"
//           role="button"
//         >
//           {isMenuOpen ? <FaTimes /> : <FaBars />}
//         </div>

//         {/* Navigation Links */}
//         <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
//           <li>
//             <NavLink to="/marketplace" className="nav-link" onClick={() => setIsMenuOpen(false)}>
//               MarketPlace
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/create-post" className="nav-link plus" onClick={() => setIsMenuOpen(false)}>
//               <span className="plu">+</span>
//             </NavLink>
//           </li>
//           {/* <li>
//             <NavLink to="/genres" className="nav-link" onClick={() => setIsMenuOpen(false)}>
             
//             </NavLink>
//           </li> */}
//           <li>
//             <NavLink to="/about-us" className="nav-link" onClick={() => setIsMenuOpen(false)}>
//             About-Us
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/contact-us" className="nav-link" onClick={() => setIsMenuOpen(false)}>
//             Contact Us
//             </NavLink>
//           </li>
//           <li>
//   <NavLink to="/download" className="nav-link" onClick={() => setIsMenuOpen(false)}>
//     <span className="down">
//       <img className="nav-icon" src="/download_8515110.png" alt="App Icon" />
//       <p className="nav-text">App</p>
//     </span>
//   </NavLink>
// </li>


//           {/* Conditionally render based on user authentication */}
//           {!currentUser ? (
//             <>
//               <li>
//                 <NavLink to="/login" className="nav-link +" onClick={() => setIsMenuOpen(false)}>
//                   Login
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/signup" className="nav-link signup" onClick={() => setIsMenuOpen(false)}>
//                   Sign Up
//                 </NavLink>
//               </li>
//             </>
//           ) : (
//             <>
//               {/* <li>
//                 <NavLink to="/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>
//                   Profile
//                 </NavLink>
//               </li> */}
//               <li>
//                 <button className="logout-btn" onClick={logOut}>
//                   Log Out
//                 </button>
//               </li>
            
//               <li>
//               <NavLink to="/" className="user-info">
//         <span>Hi, {getFirstName(currentUser.displayName) || "Dear!"}</span>
//       </NavLink>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
