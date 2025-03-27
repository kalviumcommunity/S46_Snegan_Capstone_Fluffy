import React, { useState } from "react";
import Navbar from "../A_HomeComponents/Navbars.jsx";
import Footer from "../A_HomeComponents/Footers.jsx";
import Reports from "../D_Forms/Reports.jsx";
import Lostandfoundpetdata from "../C_Apicalls/Adopt&Report/Lostandfoundpetdatas.jsx"
import main from "../assets/images/report.jpg";
import { Parallax } from "react-parallax";
import "../G_ComponentsCSS/lostandfounds.css"

function LostAndFound() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <Parallax
        blur={0}
        bgImage={main}
        bgImageAlt="Lost and Found background"
        strength={150}
      >
        <div className="lostandfound-parallax-container">
          <Navbar />
          <div className="lostandfound-parallax-content">
            <div className="lostandfound-parallax-header">
              <p className="lostandfound-scroll-text">SCROLL DOWN</p>
              <div>
                <p className="lostandfound-fluffy-heading">
                  Report a Lost <br /> Found pet
                </p>
                <p className="lostandfound-fluffy-subheading">
                  Helping reunite lost pets with their families
                </p>
              </div>
              <p className="lostandfound-scroll-text">SCROLL DOWN</p>
            </div>
          </div>
        </div>
      </Parallax>

      <section className="lostandfound-info">
        <div>
          <h1 className="lostandfound-heading">
            Welcome to Fluffy <br /> Lost & Found
          </h1>
          <p>
            At Fluffy, we understand how distressing it can be to lose a pet. 
            Our mission is to help you find your furry friend and reunite them 
            with you as quickly as possible. We believe that every lost pet 
            deserves a chance to return home, and our dedicated team is here 
            to support you through this challenging time. 
          </p>
          <p>
            By utilizing our lost and found services, you're taking the first 
            step towards bringing your beloved companion home. Remember, 
            the sooner you act, the better the chances of a happy reunion. 
            Every moment counts, and we encourage you to stay hopeful and proactive. 
            Together, we can create a network of love and support that helps 
            lost pets find their way back to the arms of their families.
          </p>
          <hr className="lostandfound-divider" />

          <div>
            <h3 className="lostandfound-consideration-heading">
              Important Steps for Finding Your Lost Pet
            </h3>
            <p>
              Losing a pet can be an overwhelming experience. Here are some 
              crucial steps to follow that can help increase the likelihood 
              of finding your furry friend.
            </p>

            <div className="lostandfound-steps-list">
              <div>
                <h4>Search Your Home and Neighborhood</h4>
                <p>
                  Begin by thoroughly searching your home and surrounding area. 
                  Pets often hide in small spaces or nearby locations.
                </p>
              </div>
              <hr className="lostandfound-divider" />
              <div>
                <h4>Spread the Word</h4>
                <p>
                  Inform your neighbors and community members about your lost pet. 
                  Share details and a recent photo to help them recognize your pet.
                </p>
              </div>
              <hr className="lostandfound-divider" />
              <div>
                <h4>Contact Local Shelters</h4>
                <p>
                  Reach out to local animal shelters and rescue organizations. 
                  Provide them with your pet's information and check their 
                  listings regularly.
                </p>
              </div>
              <hr className="lostandfound-divider" />
              <div>
                <h4>Use Social Media</h4>
                <p>
                  Utilize social media platforms to post about your lost pet. 
                  Local community groups can also be beneficial in spreading the word.
                </p>
              </div>
              <hr className="lostandfound-divider" />
              <div>
                <h4>Create a Lost Pet Flyer</h4>
                <p>
                  Make a flyer with a clear photo of your pet and your contact 
                  information. Post these flyers around your neighborhood and 
                  local businesses.
                </p>
              </div>
              <hr className="lostandfound-divider" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <Lostandfoundpetdata/>
      </section>

      <section onClick={togglePopup} className="lostandfound-button">
        <img 
          src="https://cdn-icons-png.flaticon.com/128/2353/2353855.png" 
          alt="" 
          className="lostandfound-icon" 
        />
        <button onClick={togglePopup} className="lostandfound-form-btn">
          Report Lost Pet
        </button>
      </section>

      {isPopupOpen && (
        <div className="lostandfound-popup-background">
          <div className="lostandfound-popup-container">
            <button onClick={togglePopup} className="lostandfound-popup-close-btn">X</button>
            <Reports />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default LostAndFound;
