import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../F_ApicallsCSS/lostandfound.css";

function Lostandfoundpetdatas() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [rescuePets, setRescuePets] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);



  useEffect(() => {
    axios
      .get("http://localhost:1001/main")
      .then((result) => {
        setPets(result.data);
        console.log(result)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filteredRescue = pets.filter((pet) => pet.type === "rescue");
    setRescuePets(filteredRescue);
  }, [pets]);

  useEffect(() => {
    if (selectedAnimal) {
      const filtered = pets.filter(
        (pet) => pet.animal === selectedAnimal && pet.type === "report"
      );
      setFilteredPets(filtered);
    } else {
      const filtered = pets.filter((pet) => pet.type === "report");
      setFilteredPets(filtered);
    }
  }, [selectedAnimal, pets]);

  const handleAnimalChange = (animal) => {
    setSelectedAnimal(animal);
  };

  const handleAdoptClick = (petId) => {
    const confirmed = window.confirm("Do you wish to adopt this pet?");
    if (confirmed) {
      axios
        .put(`http://localhost:1001/main/update/${petId}`, { type: "adopted" })
        .then((response) => {
          setPets((prevPets) =>
            prevPets.map((pet) =>
              pet._id === petId ? { ...pet, type: "adopted" } : pet
            )
          );
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <section className="lostandfound-section">
        <h2 className="lostandfound-section-header">Hall Of Rescued</h2>
        <hr className="lostandfound-section-divider" />
        <div className="lostandfound-grid-container">
          {rescuePets.map((pet) => (
            <div key={pet._id} className="lostandfound-pet-card">
              <img
                src={pet.image}
                alt={pet.name}
                className="lostandfound-pet-image"
              />
              <div className="lostandfound-pet-details">
                <h3 className="lostandfound-pet-name">{pet.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="lostandfound-section">
        <div className="lostandfound-control-container">
          <h1 className="lostandfound-control-header">Reported Lost Pets in Our Care</h1>
          <div>
            <button
              onClick={() => handleAnimalChange("dog")}
              className="lostandfound-button"
            >
              Dogs
            </button>
            <button
              onClick={() => handleAnimalChange("cat")}
              className="lostandfound-button"
            >
              Cats
            </button>
          </div>
        </div>
        <hr className="lostandfound-section-divider" />
        <div className="lostandfound-pets-section">
          {filteredPets.map((pet) => (
            <div key={pet._id} style={{ marginBottom: "20px" }}>
              <div className="lostandfound-pet-info-container">
                <div className="lostandfound-pet-info-text">
                  <h1 style={{ fontSize: "2em" }}>{pet.name}</h1>
                  <hr className="lostandfound-section-divider" />
                  <p>
                    <span style={{ color: "crimson" }}>{pet.breed}</span> 🔺{" "}
                    {pet.livesin}
                  </p>
                  <hr className="lostandfound-section-divider" />
                  <p>
                    {pet.age} 🔺 {pet.gender} 🔺 {pet.size} 🔺 {pet.color}
                  </p>
                  <hr className="lostandfound-section-divider" />
                  <h5 style={{ fontSize: "1em" }}>Description</h5>
                  <p className="lostandfound-pet-info-description">{pet.description}</p>
                  <button
                    onClick={() => handleAdoptClick(pet._id)}
                    className="lostandfound-adopt-button"
                  >
                    Adopt Me
                  </button>
                </div>
                <img
                  src={pet.image}
                  alt=""
                  className="lostandfound-pet-info-image"
                />
              </div>
              <hr className="lostandfound-section-divider" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Lostandfoundpetdatas;
