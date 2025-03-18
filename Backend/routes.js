const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const PetModal = require("./models/petdata");
const PetUsersModal = require("./models/petusers");
const PetFoodModal = require("./models/petfoods");
const petToysModal = require("./models/pettoys");
const CartModal = require("./models/cart");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const app = express();
app.use(cors());
app.use(express.json());

// 4 API requests

// for pets data
app.get("/main", (req, res) => {
    PetModal.find()
        .then(pets => res.json(pets))
        .catch(err => res.status(500).json({ error: err.message }));
});

// for pet foods
app.get("/main/petfoods", (req, res) => {
    PetFoodModal.find()
        .then(petfood => res.json(petfood))
        .catch(err => res.status(500).json({ error: err.message }));
});

// for pet toys
app.get("/main/pettoys", (req, res) => {
    petToysModal.find()
        .then(pettoys => res.json(pettoys))
        .catch(err => res.status(500).json({ error: err.message }));
});

// get cart
app.get("/main/yourcart", (req, res) => {
    CartModal.find()
        .then(products => res.json(products))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(1001, () => {
    console.log("Server is running at http://localhost:1001");
});
