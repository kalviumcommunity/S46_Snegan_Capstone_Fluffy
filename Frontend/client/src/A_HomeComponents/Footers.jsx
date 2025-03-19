import React from "react";
import { Link } from "react-router-dom";
import "../E_HomeComponentsCSS/Footers.css"; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2809/2809922.png"
              alt="Fluffy Logo"
              className="footer-logo-image"
            />
            <p className="footer-title">Fluffy</p>
            <p className="footer-subtitle">Connecting pets with loving homes</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <p>About</p>
              <p>Services</p>
              <p>Work</p>
              <p>Ideas</p>
              <p>Connect</p>
            </div>
            <div className="footer-column">
              <p>Why Us</p>
              <p>Work with Us</p>
              <p>Privacy</p>
            </div>
            <div className="footer-socials">
              <img src="https://cdn-icons-png.flaticon.com/128/15047/15047435.png" alt="Social Icon" />
              <img src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="Social Icon" />
              <img src="https://cdn-icons-png.flaticon.com/128/145/145807.png" alt="Social Icon" />
              <img src="https://cdn-icons-png.flaticon.com/128/3670/3670151.png" alt="Social Icon" />
            </div>
          </div>
        </div>
        <section className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Fluffy. All rights reserved.
          </p>
          <p className="footer-credits">
            Website by <strong className="footer-credits-name">Snegan</strong>
          </p>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
