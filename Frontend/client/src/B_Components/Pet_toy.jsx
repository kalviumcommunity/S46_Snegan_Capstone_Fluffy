import React from "react";
import Navbar from "../A_HomeComponents/Navbars.jsx";
import { Link } from "react-router-dom";
import Footer from "../A_HomeComponents/Footers.jsx";
import { Parallax } from "react-parallax";
import Toyshop from "./Toyshops";
import '../G_ComponentsCSS/Pet_toys.css'; // Import the CSS file
import PettoyImage from "../assets/images/Pettoy.jpg";

function Pettoy() {
  return (
    <>
      <Parallax
        blur={0}
        bgImage={PettoyImage}
        bgImageAlt="Pet toy background"
        strength={150}
      >
        <div className="pettoy-parallax">
          <Navbar />
          <div className="pettoy-center">
            <div className="pettoy-header">
              <p className="pettoy-scroll-text">SCROLL DOWN</p>
              <div className="pettoy-title-container">
                <p className="pettoy-title">Fluffy <br />🥎 Toy Store 🧶</p>
                <p className="pettoy-subtitle">Bringing Joy to Every Pet with Our Toys</p>
              </div>
              <p className="pettoy-scroll-text">SCROLL DOWN</p>
            </div>
          </div>
        </div>
      </Parallax>

      <section className="pettoy-section">
        <div>
          <h2 className="pettoy-h2">Fluffy Toys: <br /> Why Your Pets Needs Toys</h2>
          <div>
            <p>
              Pets benefit from toys in a number of ways, both physically and
              mentally. Here's a closer look at why toys are important for your
              furry (or feathery) friend:
            </p>
          </div>
          <div className="pettoy-subsection">
            <h4 className="pettoy-h4">Mental Stimulation and Stress Relief</h4>
            <p>
              In the wild, animals spend a significant amount of time hunting,
              stalking, and playing. Even domesticated pets retain these
              instincts. Toys provide an outlet for these natural behaviors,
              keeping them mentally stimulated and preventing boredom. A bored
              pet is more likely to engage in destructive chewing, barking, or
              scratching.
            </p>
          </div>
          <hr className="pettoy-hr" />
          <div className="pettoy-subsection">
            <h4 className="pettoy-h4">Exercise and Physical Health</h4>
            <p>
              Play with toys gets your pet moving, which is crucial for
              maintaining a healthy weight and strong muscles. This is
              especially important for indoor pets who may not get enough
              exercise otherwise. Interactive play sessions with you and their
              toys can provide a great workout.
            </p>
          </div>
          <hr className="pettoy-hr" />
          <div className="pettoy-subsection">
            <h4 className="pettoy-h4">Dental Health</h4>
            <p>
              Chew toys, especially for puppies and kittens, help satisfy their
              natural urge to chew. This can help prevent them from chewing on
              your furniture or other belongings. Certain dental chew toys can
              also help scrape away plaque and keep teeth clean.
            </p>
          </div>
          <hr className="pettoy-hr" />
          <div className="pettoy-subsection">
            <h4 className="pettoy-h4">Bonding and Training</h4>
            <p>
              Playing fetch, tug-of-war, or other interactive games with your
              pet is a fantastic way to bond with them. You can use toys to
              reward good behavior during training sessions, making learning a
              fun and positive experience.
            </p>
          </div>
          <hr className="pettoy-hr" />
          <div className="pettoy-subsection">
            <h4 className="pettoy-h4">Stress Relief</h4>
            <p>
              Just like us, pets can get stressed too. Play provides a healthy
              outlet for their energy and helps them relax. Interactive toys or
              puzzle feeders that challenge them mentally can be particularly
              beneficial in reducing stress levels.
            </p>
          </div>
          <hr className="pettoy-hr" />
          <div className="pettoy-subsection">
            <h4 className="pettoy-h4">Variety is Key</h4>
            <p>
              Just like us, pets can get bored with the same old toys. Rotate
              their toys periodically to keep things interesting. Consider
              choosing toys that cater to their natural instincts: squeaky toys
              for dogs, feathery wands for cats, and chew toys for both.
            </p>
          </div>
          <div>
            <p>
              By providing your pet with a variety of stimulating and safe toys,
              you're contributing to their overall well-being and happiness.
            </p>
          </div>
        </div>
      </section>
      <Toyshop />
      <Footer />
    </>
  );
}

export default Pettoy;
