import React from "react";
import Typewriter from "typewriter-effect";
import "../App.css";

function TypewriterComp() {
  return (
    <div id="fluffont">
      <p className="static-text">We are</p>
      <div className="typewriter-text">
        <Typewriter
          options={{
            strings: [
              "Fluffy.",
              "Pet Lovers.",
              "Adoptive Families.",
              "Toy Providers.",
              "Food Experts.",
              "Pet Finders."
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
    </div>
  );
}

export default TypewriterComp;
