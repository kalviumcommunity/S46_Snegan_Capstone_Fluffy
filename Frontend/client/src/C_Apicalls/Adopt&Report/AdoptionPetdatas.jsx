import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../F_ApicallsCSS/Adoptionpetdata.css";

function Adoptionpetdatas() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    console.log("Cla")
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/main`)
      .then((result) => {
        setPets(result.data);
        console.log(result)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filteredAdopted = pets.filter((pet) =>  pet.type === "adopted");
    setAdoptedPets(filteredAdopted);
  }, [pets]);

  useEffect(() => {
    if (selectedAnimal) {
      const filtered = pets.filter(
        (pet) => pet.animal === selectedAnimal && pet.type === "adopt"
      );
      setFilteredPets(filtered);
    } else {
      const filtered = pets.filter((pet) => pet.type === "adopt");
      setFilteredPets(filtered);
    }
  }, [selectedAnimal, pets]);

  const handleAnimalChange = (animal) => {
    setSelectedAnimal(animal);
  };


  return (
    <div>
      <section className="adoption-section" id="violet">
        <h2 className="adoption-section-header">Hall Of Adopted</h2>
        <hr className="adoption-section-divider" />
        <div className="adoption-grid-container">
          {adoptedPets.map((pet) => (
            <div key={pet._id} className="adoption-pet-card">
              <img src={pet.image} alt={pet.name} className="adoption-pet-image" />
              <div className="adoption-pet-details">
                <h3 className="adoption-pet-name">{pet.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="adoption-section" style={{ backgroundColor: "initial" }}>
        <div className="adoption-control-container">
          <h1 className="adoption-control-header">Pets in Our Care</h1>
          <div>
            <button onClick={() => handleAnimalChange("dog")} className="adoption-button">
              Dogs
            </button>
            <button onClick={() => handleAnimalChange("cat")} className="adoption-button">
              Cats
            </button>
          </div>
        </div>
        <hr className="adoption-section-divider" />
        <div className="adoption-pets-section">
          {filteredPets.map((pet) => (
            <div key={pet._id} style={{ marginBottom: "20px" }}>
              <div className="adoption-pet-info-container">
                <div>
                  <h1 style={{ fontSize: "2em" }}>{pet.name}</h1>
                  <hr className="adoption-section-divider" />
                  <p>
                    <span style={{ color: "#6504b5" }}>{pet.breed}</span> 🔺{pet.livesin}
                  </p>
                  <hr className="adoption-section-divider" />
                  <p>
                    {pet.age} 🔺 {pet.gender} 🔺 {pet.size} 🔺 {pet.color}
                  </p>
                  <hr className="adoption-section-divider" />
                  <h5 style={{ fontSize: "1em" }}>Description</h5>
                  <p className="adoption-pet-info-description">{pet.description}</p>
                  <div style={{ marginTop: "20px" }}>
                    <button
                      className="adoption-adopt-button"
                    >
                      Adopt Me
                    </button>
                  </div>
                </div>
                <img src={pet.image} alt="" className="adoption-pet-info-image" />
              </div>
              <hr className="adoption-section-divider" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Adoptionpetdatas;
