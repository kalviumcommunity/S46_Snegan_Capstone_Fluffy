import React from "react";
import Navbar from "../A_HomeComponents/Navbars.jsx";
import { Link } from "react-router-dom";
import Footer from "../A_HomeComponents/Footers.jsx";
import { Parallax } from "react-parallax";
import Foodshop from "./Foodshops.jsx";
import '../G_ComponentsCSS/Pet_foods.css';
import main from "../assets/images/petfood1.avif";

function Petfood() {
  return (
    <>
      <Parallax
        blur={0}
        bgImage={main}
        bgImageAlt="Pet food background"
        strength={150}
      >
        <div className="petfood-parallax">
          <Navbar />
          <div className="petfood-center">
            <div className="petfood-header">
              <p className="petfood-scroll-text">SCROLL DOWN</p>
              <div style={{textAlign:"center"}}>
                <p className="petfood-title">Fluffy <br />🍖 Food Store 🍖</p>
                <p className="petfood-subtitle">Fuel Their Play with Fluffy's Pet Food</p>
              </div>
              <p className="petfood-scroll-text">SCROLL DOWN</p>
            </div>
          </div>
        </div>
      </Parallax>
      <section className="petfood-section">
        <div>
          <h2 className="petfood-h2">Why Choose Fluffy for Your Pet Food?</h2>
          <div> 
            <h4 className="petfood-h4">Species-Specific Nutrition</h4>
          
              Cats and dogs have vastly different dietary requirements. At Fluffy, we recognize these differences:
              <ul className="petfood-ul">
                <li><strong className="petfood-h4">Cats:</strong> As obligate carnivores, cats need animal protein for survival. Our cat food selections are high in animal protein to meet these needs.</li>
                <li><strong className="petfood-h4">Dogs:</strong> Dogs are omnivores and thrive on a mix of protein, vegetables, and grains. Our dog food offers a balanced mix to support their health.</li>
              </ul>
          </div>
          <hr className="petfood-hr" />
          <div>
            <h4 className="petfood-h4">Life Stage Formulas</h4>
           
              Pets have different nutritional needs at various stages of their lives. Fluffy offers tailored food options for every life stage:
              <ul className="petfood-ul">
                <li><strong className="petfood-h4">Puppies and Kittens:</strong> High in protein and calories for growth.</li>
                <li><strong className="petfood-h4">Adult Pets:</strong> Balanced nutrition to maintain health and energy.</li>
                <li><strong className="petfood-h4">Senior Pets:</strong> Formulated to support aging joints and weight management.</li>
              </ul>
           
          </div>
          <hr className="petfood-hr" />
          <div>
            <h4 className="petfood-h4">Activity Level Adaptations</h4>
           
              Every pet has a different activity level. Our products cater to these differences:
              <ul className="petfood-ul">
                <li><strong className="petfood-h4">Active Pets:</strong> Foods with higher calorie content to fuel their energy.</li>
                <li><strong className="petfood-h4">Less Active Pets:</strong> Weight management formulas to prevent obesity.</li>
              </ul>
           
          </div>
          <hr className="petfood-hr" />
          <div>
            <h4 className="petfood-h4">Breed-Specific Needs</h4>
           
              Different breeds have specific dietary requirements. Fluffy provides:
              <ul className="petfood-ul">
                <li><strong className="petfood-h4">Large Breeds:</strong> Food designed for healthy bone growth.</li>
                <li><strong className="petfood-h4">Small Breeds:</strong> Smaller kibble sizes for easier chewing and digestion.</li>
              </ul>
           
          </div>
          <hr className="petfood-hr" />
          <div>
            <h4 className="petfood-h4">Health and Special Dietary Needs</h4>
           
              Pets can have allergies, digestive issues, or other health concerns. We offer:
              <ul className="petfood-ul">
                <li><strong className="petfood-h4">Special Diets:</strong> Limited ingredient options, probiotics, and other modifications to address specific health issues.</li>
              </ul>
           
          </div>
          <div>
              By understanding your pet's unique needs – species, age, activity level, breed, and any health concerns – you can choose a food that provides the optimal nutrition for a long and healthy life. When in doubt, consult your veterinarian for personalized guidance on your pet's dietary journey!
          </div>
        </div>
      </section>
      <Foodshop />
      <Footer />
    </>
  );
}

export default Petfood;
