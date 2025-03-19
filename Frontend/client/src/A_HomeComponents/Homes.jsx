// Home.js
import React, { useRef } from "react";
// import { Parallax } from "react-parallax";
import Navbar from "./Navbars";
import Footer from "./Footers";
// import best from "../images/best.jpg";
// import back1 from "../images/best.jpg";
// import love from "../images/home.jpg";
// import Typewriter from "./Typewriters";
import { Link } from "react-router-dom";
import "../E_HomeComponentsCSS/Homes.CSS";

function Home() {
  const adoptionRef = useRef(null);
  const foodRef = useRef(null);
  const toyRef = useRef(null);
  const reportRef = useRef(null);
  const hithereRef = useRef(null);

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section id="homeback" className="home-section">
        <div className="home-overlay">
          <Navbar />
          {/* <Typewriter /> */}
        </div>
      </section>

      <section id="hithere" ref={hithereRef} className="hithere-section">
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

          <div id="body" className="home-body">
            <div ref={adoptionRef} className="home-card-violet">
              <div className="card-header">
                <div>
                  <h1 className="card-title">Want to adopt a pet</h1>
                  <p className="card-description">
                    Adopting a pet brings joy and saves lives. By choosing
                    adoption, you alleviate shelter overcrowding and gain a
                    loyal companion. It's a socially responsible choice that
                    forms a special bond.
                  </p>
                </div>
              </div>
              <div className="card-footer">
                <Link to="/adopt-pets" className="home-explore-button">
                  Explore
                </Link>
                <div className="card-list">
                  <h1>Here's what you can do</h1>
                  <ul>
                    <li>Support animal shelters</li>
                    <li>Promote adoption</li>
                    <li>Educate on adopting animals</li>
                    <li>Volunteer your time</li>
                    <li>Donations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div ref={foodRef} className="home-card-green">
              <div className="card-header">
                <div>
                  <h1 className="card-title">Want to buy pet food</h1>
                  <p className="card-description">
                    High-quality pet food ensures your pet's health and
                    happiness. By choosing Fluffy, you provide the best
                    nutrition for your furry friend. Explore our extensive range
                    of pet food today!
                  </p>
                </div>
              </div>
              <div className="card-footer">
                <Link to="/pet-food" className="home-explore-button">
                  Explore
                </Link>
                <div className="card-list">
                  <h1>Here's what you can do</h1>
                  <ul>
                    <li>Choose the right food</li>
                    <li>Understand pet nutrition</li>
                    <li>Consult veterinarians</li>
                    <li>Support local pet shops</li>
                  </ul>
                </div>
              </div>
            </div>

            <div ref={toyRef} className="home-card-blue">
              <div className="card-header">
                <div>
                  <h1 className="card-title">Want to buy a pet toy</h1>
                  <p className="card-description">
                    Engaging toys stimulate your pet's mind and body. Choose
                    from our diverse selection to keep your furry friend happy
                    and active. Shop now for the best pet toys at Fluffy!
                  </p>
                </div>
              </div>
              <div className="card-footer">
                <Link to="/pet-toy" className="home-explore-button">
                  Explore
                </Link>
                <div className="card-list">
                  <h1>Here's what you can do</h1>
                  <ul>
                    <li>Choose toys wisely</li>
                    <li>Rotate toys for interest</li>
                    <li>Engage in playtime</li>
                    <li>Monitor toy safety</li>
                  </ul>
                </div>
              </div>
            </div>

            <div ref={reportRef} className="home-card-red">
              <div className="card-header">
                <div>
                  <h1 className="card-title">Want to report a pet</h1>
                  <p className="card-description">
                    Help us find lost pets! Reporting a missing pet is crucial
                    in reuniting them with their families. If you’ve seen a lost
                    pet, please report it immediately.
                  </p>
                </div>
              </div>
              <div className="card-footer">
                <Link to="/lost-pets" className="home-explore-button">
                  Explore
                </Link>
                <div className="card-list">
                  <h1>Here's what you can do</h1>
                  <ul>
                    <li>Report missing pets</li>
                    <li>Share on social media</li>
                    <li>Contact local shelters</li>
                    <li>Be observant in your area</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}

export default Home;