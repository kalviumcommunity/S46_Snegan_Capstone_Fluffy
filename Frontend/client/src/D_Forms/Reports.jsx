import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./Firebase"; 
import { v4 } from "uuid";
import "../H_FormsCSS/report.CSS"; // Import the external CSS file
import Cookies from "js-cookie";

function Report() {
  const [petInfo, setPetInfo] = useState({
    petAnimal: '',
    petName: '',
    petBreed: '',
    petAge: '',
    petGender: '',
    petColor: '',
    petSize: '',
    petDescription: '',
    petLastSeen: '',
    petDateLost: '',
    petLivesIn: '',
    petImage: '',
  });

  const [imageUpload, setImageUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Google OAuth callback
  useEffect(() => {
    const handleGoogleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const error = params.get('error');
      
      if (error) {
        console.error("Google authentication failed:", error);
        return;
      }
      
      if (token) {
        try {
          // Store the token
          Cookies.set("Token", token);
          
          // Get user info from backend
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.data) {
            Cookies.set("Username", response.data.name);
            Cookies.set("Useremail", response.data.email);
            navigate("/");
          }
        } catch (err) {
          console.error("Error with Google login:", err);
        }
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setPetInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (imageUpload) {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      
      try {
        const snapshot = await uploadBytes(imageRef, imageUpload);
        const url = await getDownloadURL(snapshot.ref);
        
        setPetInfo((prevState) => ({
          ...prevState,
          petImage: url,
        }));

        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/main/postdata`, {
          ...petInfo,
          petImage: url,
        });

        console.log("Posted Successfully", response);
        
        setPetInfo({
          petAnimal: '',
          petName: '',
          petBreed: '',
          petAge: '',
          petGender: '',
          petColor: '',
          petSize: '',
          petDescription: '',
          petLastSeen: '',
          petDateLost: '',
          petLivesIn: '',
          petImage: '',
        });
        setImageUpload(null);
      } catch (err) {
        console.error("Error posting data:", err);
      } finally {
        setLoading(false);
        setTimeout(() => {
          navigate("/report-pets");
        }, 5000);
      }
    } else {
      alert("Please upload an image.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/google`);
      if (response.data && response.data.redirectURI) {
        window.location.href = response.data.redirectURI;
      }
    } catch (error) {
      console.error("Error initiating Google login:", error);
    }
  };

  return (
    <div className="report-container">
      <div className="report-box">
        <form onSubmit={handleSubmit} className="report-form">
          <h1 className="form-title">Adopt and Report Form</h1>
          <hr className="form-divider" />

          <div className="form-grid">
            <div>
              <label>Form Type:</label>
              <select name="petType" onChange={handleInput} value={petInfo.petType} required>
                <option value="">Select form type</option>
                <option value="adopt">Adopt</option>
                <option value="report">Report</option>
              </select>
            </div>

            <div>
              <label>Pet Name:</label>
              <input type="text" name="petName" placeholder="Enter pet's name" onChange={handleInput} value={petInfo.petName} required />
            </div>

            <div>
              <label>Pet Animal:</label>
              <select name="petAnimal" onChange={handleInput} value={petInfo.petAnimal} required>
                <option value="">Select Animal</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </div>

            <div>
              <label>Pet Breed:</label>
              <input type="text" name="petBreed" placeholder="Enter pet's breed" onChange={handleInput} value={petInfo.petBreed} required />
            </div>

            <div>
              <label>Pet Age:</label>
              <select name="petAge" onChange={handleInput} value={petInfo.petAge} required>
                <option value="">Select Age</option>
                <option value="Kitten">Kitten</option>
                <option value="Puppy">Puppy</option>
                <option value="Young">Young</option>
                <option value="Senior">Old/Seniors</option>
              </select>
            </div>

            <div>
              <label>Pet Gender:</label>
              <select name="petGender" onChange={handleInput} value={petInfo.petGender} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label>Pet Size:</label>
              <select name="petSize" onChange={handleInput} value={petInfo.petSize} required>
                <option value="">Select Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            <div>
              <label>Pet Color:</label>
              <input type="text" name="petColor" placeholder="Enter pet's color" onChange={handleInput} value={petInfo.petColor} required />
            </div>

            <div>
              <label>Pet Image:</label>
              <input type="file" onChange={(event) => setImageUpload(event.target.files[0])} required />
            </div>

            <div className="full-width">
              <label>Pet Description:</label>
              <textarea name="petDescription" placeholder="Provide additional details about the pet." onChange={handleInput} value={petInfo.petDescription} required />
            </div>

            <div>
              <label>Pet Last Seen:</label>
              <input type="text" name="petLastSeen" placeholder="Enter last known location" onChange={handleInput} value={petInfo.petLastSeen} required />
            </div>

            <div>
              <label>Date Lost:</label>
              <input type="date" name="petDateLost" onChange={handleInput} value={petInfo.petDateLost} required />
            </div>

            <div>
              <label>Pet From:</label>
              <input type="text" name="petLivesIn" placeholder="Enter city or area" onChange={handleInput} value={petInfo.petLivesIn} required />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          <div onClick={handleGoogleLogin} className="google-signin">
            Sign in with Google
          </div>
        </form>
      </div>
    </div>
  );
}

export default Report;
