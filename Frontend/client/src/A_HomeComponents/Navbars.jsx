import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Cookies from 'js-cookie'; // Import Cookies for handling cookies

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [usernameInitial, setUsernameInitial] = useState(null);
  const navigate = useNavigate(); // Hook for navigation
  const username = Cookies.get('Username');
  const email = Cookies.get('Useremail');

  const toggleSideDiv = () => {
    setIsOpen(!isOpen);
  };

  const closeSideDiv = () => {
    setIsOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.code === 'Slash') { // Check for Ctrl + /
      toggleSideDiv();
    }
  };

  const handleClickOutside = (e) => {
    if (isOpen && !e.target.closest('.sideDiv') && !e.target.closest('.toggle-button')) {
      closeSideDiv();
    }
  };

  const handleLogout = () => {
    // Remove cookies
    Cookies.remove('Username');
    Cookies.remove('Useremail');
    
    // Redirect to home page and force reload
    navigate('/', { replace: true });
    window.location.reload(); // Force a page reload to ensure the state is reset
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClickOutside);

    if (username) {
      setUsernameInitial(username.charAt(0).toUpperCase());
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, username]);

  return (
    <>
      <nav
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-around",
          alignContent: "center",
          backdropFilter: "blur(20px)",
          zIndex: 2,
          backgroundColor: "black",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2809/2809922.png"
              alt=""
              style={{ height: "5vh", marginRight: "0px" }}
            />
          </Link> 
          <Link
            to="/"
            style={{
              textDecoration: "none",
              fontSize: "1.5rem",
              color: "white",
            }}
          >
            Fluffy
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-between",
            width: "12vw",
          }}
        >
          <img
            className="toggle-button"
            onClick={toggleSideDiv}
            src="https://img.icons8.com/?size=100&id=8113&format=png&color=FFFFFF"
            alt=""
            style={{ height: "3.5vh", cursor: "pointer" }}
          />
          <Link
            to="/your-cart"
            style={{
              color: "black",
              textDecoration: "none",
            }}
          >
            <div>
              <img
                src="https://img.icons8.com/?size=100&id=ii6Lr4KivOiE&format=png&color=FFFFFF"
                alt=""
                style={{ height: "3.5vh" }}
              />
            </div>
          </Link>
          {usernameInitial ? (
            <div
              style={{
                color: "white",
                border: "1px solid white",
                padding: "7px 12px",
                borderRadius: "50%",
                textAlign: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
                background: "red"
              }}
            >
              {usernameInitial}
            </div>
          ) : (
            <Link
              to="/signup"
              style={{
                color: "black",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  color: "white",
                  border: "1px solid white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                <p>Signup</p>
              </div>
            </Link>
          )}
        </div>
      </nav>
      <div
        className={`sideDiv ${isOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? "0" : "-50%",
          width: "100%",
          maxWidth: "350px", // Limiting sidebar width
          height: "100vh",
          overflow: "auto",
          background: "white",
          color: "black",
          padding: "30px 0",
          transition: "right 0.5s ease",
          boxShadow: "0 0 10px rgba(0, 0 , 0, 0.5)",
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          onClick={closeSideDiv}
          className="closeButton"
          style={{
            cursor: "pointer",
            fontSize: "1.1em",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            fontWeight: "bolder",
            marginBottom: "10px" // Added margin to separate from the sidebar content
          }}
        >
          &times; Close sidebar
        </div>
        <hr style={{ margin: "20px 0" }} />

        <div style={{ padding: "20px" }}>
          <p>
            <Link
              to="/"
              style={{ textDecoration: "none", fontWeight: "bold", color: "black" }}
              onClick={closeSideDiv}
            >
              HOME
            </Link>
          </p>
          <p style={{ margin: "20px 0", border: "0.1px solid gray" }} />
          <p>
            <Link
              to="/adopt-pets"
              style={{ textDecoration: "none", fontWeight: "bold", color: "#6504b5" }}
              onClick={closeSideDiv}
            >
              FLUFFY ADOPT PETS
            </Link>
          </p>
          <hr style={{ margin: "20px 0", border: "0.1px solid gray" }} />
          <p>
            <Link
              to="/pet-foods"
              style={{ textDecoration: "none", fontWeight: "bold", color: "#388E3C" }}
              onClick={closeSideDiv}
            >
              FLUFFY FOOD
            </Link>
          </p>
          <hr style={{ margin: "20px 0", border: "0.1px solid gray" }} />
          <p>
            <Link
              to="/pet-toys"
              style={{ textDecoration: "none", fontWeight: "bold", color: "#00008B" }}
              onClick={closeSideDiv}
            >
              FLUFFY TOYS
            </Link>
          </p>
          <hr style={{ margin: "20px 0", border: "0.1px solid gray" }} />
          <p>
            <Link
              to="/report-pets"
              style={{ textDecoration: "none", fontWeight: "bold", color: "crimson" }}
              onClick={closeSideDiv}
            >
              FLUFFY REPORTED PETS
            </Link>
          </p>
          <hr style={{ margin: "20px 0", border: "0.1px solid gray" }} />
        </div>
        <div style={{ padding: "30px", textAlign: "center" }}>
          {usernameInitial && (
            <div>
              <div
                style={{
                  color: "white",
                  border: "1px solid white",
                  padding: "15px",
                  borderRadius: "50%",
                  textAlign: "center",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  background: "red",
                  width: "5vw",
                  margin: "auto"
                }}
              >
                {usernameInitial}
              </div>
              <div style={{ lineHeight: "1.7", padding: "10px" }}>
                <p style={{ fontSize: "1.2em" }}>{username}</p>
                <p style={{ fontSize: "1.2em" }}>{email}</p>
                <div>
                  <button
                    onClick={handleLogout}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      marginTop: "20px" // Adjusted margin for space above logout button
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
          <div
            style={{
              textAlign: "center",
              padding: "11px",
              fontSize: "0.8em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bolder",
              borderTop: "3px dotted black",
              position: "fixed",
              bottom: "0" // Position at the bottom of the sidebar
            }}
          >
            Press " Ctrl + / "  to Open & Close Navbar
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
