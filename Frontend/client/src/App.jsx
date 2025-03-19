import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./A_HomeComponents/Homes";
import Adoption from "./B_Components/Adoptions";
import Petfood from "./B_Components/Pet_food";
import Pettoy from "./B_Components/Pet_toy";
import Lostandfound from "./B_Components/Lostandfounds";
// import SignIn from './Forms/SignIn';
// import SignUp from "./Forms/SignUp";
import Dogfood from "./C_Apicalls/Petfoods/Dogfoods";
import Catfood from "./C_Apicalls/Petfoods/Catfoods";
import Dogtreat from "./C_Apicalls/Petfoods/Dogtreats";
import Cattreat from "./C_Apicalls/Petfoods/Cattreats";
import Dogtoys from "./C_Apicalls/Pettoys/Dogtoys";
import Cattoys from "./C_Apicalls/Pettoys/Cattoys";
import Cart from "./B_Components/Carts";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} /> */}

        <Route path="/adopt-pets" element={<Adoption />} />
        <Route path="/report-pets" element={<Lostandfound />} />

       
        <Route path="/pet-foods" element={<Petfood />} />
        <Route path="/dog-food" element={<Dogfood/>} />
        <Route path="/dog-treat" element={<Dogtreat/>} />
        <Route path="/cat-food" element={<Catfood />} />
        <Route path="/cat-treat" element={<Cattreat />} />

        
        <Route path="/pet-toys" element={<Pettoy />} />
        <Route path="/dog-toy" element={<Dogtoys />} />
        <Route path="/cat-toy" element={<Cattoys />} />

      
        <Route path="/your-cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
