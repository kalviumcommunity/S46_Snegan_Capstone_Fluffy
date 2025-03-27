import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../E_HomeComponentsCSS/Navbars.css"; // Import the CSS file

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [usernameInitial, setUsernameInitial] = useState(null);
  const navigate = useNavigate();
  const username = Cookies.get("Username");
  const email = Cookies.get("Useremail");

  const toggleSideDiv = () => {
    setIsOpen(!isOpen);
  };

  const closeSideDiv = () => {
    setIsOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.code === "Slash") {
      toggleSideDiv();
    }
  };

  const handleClickOutside = (e) => {
    if (
      isOpen &&
      !e.target.closest(".sideDiv") &&
      !e.target.closest(".toggle-button")
    ) {
      closeSideDiv();
    }
  };

  const handleLogout = () => {
    Cookies.remove("Username");
    Cookies.remove("Useremail");

    navigate("/", { replace: true });
    window.location.reload();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", handleClickOutside);

    if (username) {
      setUsernameInitial(username.charAt(0).toUpperCase());
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, username]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2809/2809922.png"
              alt=""
              className="navbar-logo-img"
            />
          </Link>
          <Link to="/" className="navbar-logo-text">
            Fluffy
          </Link>
        </div>
        <div className="navbar-actions">
          <img
            className="toggle-button"
            onClick={toggleSideDiv}
            src="https://img.icons8.com/?size=100&id=8113&format=png&color=FFFFFF"
            alt=""
            // className="navbar-toggle"
          />
          <Link to="/your-cart" className="navbar-cart">
            <div>
              <img
                src="https://img.icons8.com/?size=100&id=ii6Lr4KivOiE&format=png&color=FFFFFF"
                alt=""
                className="navbar-cart-img"
              />
            </div>
          </Link>
          {usernameInitial ? (
            <div className="navbar-user-initial">{usernameInitial}</div>
          ) : (
            <Link to="/login" className="navbar-login">
              <div>
                <p>Login</p>
              </div>
            </Link>
          )}
        </div>
      </nav>
      <div className={`sideDiv ${isOpen ? "open" : ""}`}>
        <div onClick={closeSideDiv} className="closeButton">
          &times; Close sidebar
        </div>
        <hr />
        <div className="sidebar-user-section">
          {usernameInitial && (
            <div>
              <div className="sidebar-user-initial">{usernameInitial}</div>
              <div className="sidebar-user-details">
                <p>{username}</p>
                <p>{email}</p>
                <div>
                  <button onClick={handleLogout} className="sidebar-logout-btn">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="sidebar-shortcut">
            Press " Ctrl + / " to Open & Close Navbar
          </div>
        </div>
        <div className="sidebar-menu">
          <p>
            <Link to="/" className="sidebar-menu-item home">
              HOME
            </Link>
          </p>
          <hr />
          <p>
            <Link to="/adopt-pets" className="sidebar-menu-item adopt">
              FLUFFY ADOPT PETS
            </Link>
          </p>
          <hr />
          <p>
            <Link to="/pet-foods" className="sidebar-menu-item food">
              FLUFFY FOOD
            </Link>
          </p>
          <hr />
          <p>
            <Link to="/pet-toys" className="sidebar-menu-item toys">
              FLUFFY TOYS
            </Link>
          </p>
          <hr />
          <p>
            <Link to="/report-pets" className="sidebar-menu-item report">
              FLUFFY REPORTED PETS
            </Link>
          </p>
          <hr />
          <p>
            <Link to="/your-cart" className="sidebar-menu-item cart">
              YOUR CART
            </Link>
          </p>
          <hr />
        </div>
      </div>
    </>
  );
}

export default Navbar;
