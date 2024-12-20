import React from "react";
import "../styles/Footer.css";
//import { Link } from "react-router-dom";
import {  FaYoutube, FaTelegram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Navigation Links */}
      

        {/* Social Media Icons */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div
          
          
          
          
          
          
          
           
          className="social-icons">
           
            <a href="https://www.linkedin.com/in/seyfadin-abdela-68112b33a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="@seyfitti" target="_blank" rel="noopener noreferrer">
              <FaTelegram />
            </a>
            <a href="www.youtube.com/@SeyfadinTech" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Copyright Information */}
        <div className="footer-copyright">
          <p>© {currentYear} AastuVoice. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
