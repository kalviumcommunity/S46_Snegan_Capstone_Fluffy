const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const PetModal = require("./models/petdata");
const PetUsersModal = require("./models/petusers");
const PetFoodModal = require("./models/petfoods");
const petToysModal = require("./models/pettoys");
const CartModal = require("./models/cart");
const ReportModal = require("./models/reports");
const authRouter = require("./Googleauth");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here"; // Fallback secret key

// Use auth routes
app.use("/auth", authRouter);

// Middleware for Authentication
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).send("Unauthorized: No token provided");
    }
    const authToken = token.split("Bearer ")[1];
    try {
        const decoded = jwt.verify(authToken, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).send("Forbidden: Invalid token");
    }
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};

// Reports Routes
app.post("/reports", async (req, res) => {
    try {
        const report = new ReportModal(req.body);
        await report.save();
        res.status(201).json(report);
    } catch (error) {
        console.error("Error creating report:", error);
        res.status(400).json({ error: "Failed to create report" });
    }
});

app.get("/reports", async (req, res) => {
    try {
        const reports = await ReportModal.find().sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ error: "Failed to fetch reports" });
    }
});

// **GET Requests**
app.get("/main", (req, res) => {
    PetModal.find()
        .then(pets => {
            res.json(pets)
            // console.log(pets)
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.get("/main/petfoods", (req, res) => {
    PetFoodModal.find()
        .then(petfood => res.json(petfood))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.get("/main/pettoys", (req, res) => {
    petToysModal.find()
        .then(pettoys => res.json(pettoys))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.get("/main/yourcart", (req, res) => {
    CartModal.find()
        .then(products => res.json(products))
        .catch(err => res.status(500).json({ error: err.message }));
});

// **POST Requests**
app.post("/main/postdata", async (req, res) => {
    try {
        const data = req.body;
        const newPet = await PetModal.create(data);
        res.json(newPet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/main/addfood", async (req, res) => {
    try {
        const data = req.body;
        const newFood = await PetFoodModal.create(data);
        res.json(newFood);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/main/addtoy", async (req, res) => {
    try {
        const data = req.body;
        const newToy = await petToysModal.create(data);
        res.json(newToy);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/main/addtocart", (req, res) => {
    console.log("req", req.body)
    const data = {
        ...req.body,
        // userId: req.user.id
    };
    CartModal.create(data)
        .then(products => res.json(products))
        .catch(err => res.status(500).json({ error: err.message }));
});

// **PUT Requests**
app.put("/main/editdata/:id", (req, res) => {
    const id = req.params.id;
    const update = req.body;
    PetModal.findByIdAndUpdate(id, update, { new: true })
        .then(updatedPet => {
            if (!updatedPet) {
                return res.status(404).json({ error: "Pet not found" });
            }
            res.json(updatedPet);
        })
        .catch(err => res.status(500).json({ error: "Failed to update pet" }));
});

// **DELETE Requests**
app.delete("/main/addtocart/:id", (req, res) => {
    const id = req.params.id;
    CartModal.findOneAndDelete({ _id: id})
        .then(product => {
            if (!product) {
                return res.status(404).json({ error: 'Item not found or unauthorized' });
            }
            res.json(product);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// Clear user's cart (checkout)
app.delete("/main/yourcart/clear", (req, res) => {
    CartModal.deleteMany({})
        .then(() => res.json({ message: 'Cart cleared successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

const PORT = process.env.PORT || 1001;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


