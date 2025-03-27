// Home.js
import React, { useRef } from "react";
import Navbar from "./Navbars";
import Footer from "./Footers";
import { Link } from "react-router-dom";
import "../E_HomeComponentsCSS/Homes.CSS";
import { Typewriter } from "react-simple-typewriter";
import { Parallax } from "react-parallax";
import homey from "../assets/images/home4.jpg"

function Home() {
  const adoptionRef = useRef(null);
  const foodRef = useRef(null);
  const toyRef = useRef(null);
  const reportRef = useRef(null);

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section id="homeback" className="home-section">
        <Navbar />
        <Parallax
          blur={0}
          bgImage={homey}
          bgImageAlt="Pet background"
          strength={150}
        >
          <div className="home-overlay">
            <div className="hero-section">
              <h1>
                <span>🐶Fluffy, We will🐱</span><br />
                <Typewriter
                  words={[
                    "Help You Find Your Perfect Companion",
                    "Make Pet Adoption Easy",
                    "Care for Every Pet's Needs",
                    "Create Happy Pet Families",
                    "Support Pet Welfare"
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                />
              </h1>
              <p>Your one-stop destination for pet adoption and care</p>
            </div>
          </div>
        </Parallax>
      </section>

      <section className="services-section">
        <div className="services-sidebar">
          <h1 className="services-title">Services</h1>
          <div className="home-card" onClick={() => handleScroll(adoptionRef)}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/5267/5267453.png"
              alt="Adopt a pet"
              className="service-icon"
            />
            <p className="service-text">ADOPT A PET</p>
          </div>
          <div className="home-card" onClick={() => handleScroll(foodRef)}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/4716/4716331.png"
              alt="Buy pet food"
              className="service-icon"
            />
            <p className="service-text">BUY PET FOOD</p>
          </div>
          <div className="home-card" onClick={() => handleScroll(toyRef)}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/7438/7438546.png"
              alt="Buy pet toy"
              className="service-icon"
            />
            <p className="service-text">BUY PET TOY</p>
          </div>
          <div className="home-card" onClick={() => handleScroll(reportRef)}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/2353/2353855.png"
              alt="Report a pet"
              className="service-icon"
            />
            <p className="service-text">REPORT A PET</p>
          </div>
        </div>

        <div className="content-section">
          <div ref={adoptionRef} className="home-card-violet">
            <div className="card-header">
              <div>
                <h1 className="card-title">Want to adopt a pet</h1>
                <p className="card-description">
                  Adopting a pet brings joy and saves lives. By choosing
                  adoption, you alleviate shelter overcrowding and gain a
                  loyal companion.
                </p>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/adopt-pets" className="home-explore-button">
                Explore
              </Link>
            </div>
          </div>

          <div ref={foodRef} className="home-card-green">
            <div className="card-header">
              <div>
                <h1 className="card-title">Want to buy pet food</h1>
                <p className="card-description">
                  High-quality pet food ensures your pet's health and
                  happiness. Explore our extensive range of pet food today!
                </p>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/pet-foods" className="home-explore-button">
                Explore
              </Link>
            </div>
          </div>

          <div ref={toyRef} className="home-card-blue">
            <div className="card-header">
              <div>
                <h1 className="card-title">Want to buy a pet toy</h1>
                <p className="card-description">
                  Engaging toys stimulate your pet's mind and body. Choose
                  from our diverse selection to keep your furry friend happy
                  and active.
                </p>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/pet-toys" className="home-explore-button">
                Explore
              </Link>
            </div>
          </div>

          <div ref={reportRef} className="home-card-red">
            <div className="card-header">
              <div>
                <h1 className="card-title">Want to report a pet</h1>
                <p className="card-description">
                  Help us find lost pets! Reporting a missing pet is crucial
                  in reuniting them with their families.
                </p>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/report-pets" className="home-explore-button">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;