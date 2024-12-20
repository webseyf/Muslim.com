//import React, { useEffect, useState } from 'react';
// import QuranVerse from '../components/QuranVerse';
// import Hadith from '../components/Hadith';
 import { Link } from 'react-router-dom';
// import { getRandomItem } from '../utils/randomSelector';
import { useAuth } from "../context/Authcontext.jsx";
const Home = () => {
  const { userRole } = useAuth(); 


  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to the Muslim Students Platform</h1>
        <p>Your gateway to knowledge, community, and spiritual growth.</p>
      </header>

 

      {/* Quick Links */}
      <section style={styles.quickLinks}>
        <h2>Quick Links</h2>
        <ul style={styles.linkList}>
          <li><Link to="/library">📚 E-Library</Link></li>
          <li><Link to="/events">📅 Event Calendar</Link></li>
          <li><Link to="/forum">💬 Forum</Link></li>
          <li><Link to="/quiz">📝 Islamic Quiz</Link></li>
          <li><Link to="/donate">🤲 Donate</Link></li>
          
        </ul>
      </section>
      <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/resources">Resources</Link>
        </li>
        
        {/* Conditional rendering based on user role */}
        {userRole === "admin" && (
          <>
            <li>
              <Link to="/admin-dashboard">Admin Dashboard</Link>
            </li>
            <li>
              <Link to="/manage-users">Manage Users</Link>
            </li>
            <li>
              <Link to="/manage-resources">Manage Resources</Link>
            </li>
          </>
        )}

        {userRole === "user" && (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/study-groups">Study Groups</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
    </div>
  );
};

// Inline styles (replace with CSS or Styled-Components as needed)
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  section: {
    margin: '20px 0',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  quickLinks: {
    marginTop: '30px',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '15px',
  },
};

export default Home;
