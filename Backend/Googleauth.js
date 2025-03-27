const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const PetUsersModal = require("./models/petusers");
const dotenv = require("dotenv");

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "your_client_id_here";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "your_client_secret_here";
const REDIRECT_URI = "http://localhost:5173/login";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";
const MONGO_URI = process.env.MONGO_URI || "your_mongodb_uri_here";

// Generate JWT Token
const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "21h" });
};

// Get Google OAuth URL
router.get("/google/url", (req, res) => {
    try {
        if (!GOOGLE_CLIENT_ID) {
            return res.status(500).json({ error: "Google Client ID not configured" });
        }

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${GOOGLE_CLIENT_ID}` +
            `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
            `&response_type=code` +
            `&scope=${encodeURIComponent("https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile")}` +
            `&access_type=offline` +
            `&prompt=consent`;

        res.json({ url: authUrl });
    } catch (error) {
        console.error("Error generating Google auth URL:", error);
        res.status(500).json({ error: "Failed to generate authentication URL" });
    }
});

// Handle Google OAuth callback
router.post("/google/callback", async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ error: "Authorization code is required" });
        }

        // Exchange code for tokens
        const tokenResponse = await axios.post(
            "https://oauth2.googleapis.com/token", 
            {
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: "authorization_code"
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const { access_token } = tokenResponse.data;

        // Get user info from Google
        const userResponse = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${access_token}` }
        });

        const { name, email, picture } = userResponse.data;

        // Check if user exists
        let user = await PetUsersModal.findOne({ email });

        if (!user) {
            // Create new user
            const token = generateToken({ email });
            user = await PetUsersModal.create({
                name,
                email,
                profilePicture: picture || "",
                token
            });
        } else {
            // Update token for existing user
            const token = generateToken({ id: user._id, email: user.email });
            user.token = token;
            // Update profile picture if available
            if (picture) {
                user.profilePicture = picture;
            }
            await user.save();
        }

        // Return user data and token
        res.json({
            user: {
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture
            },
            token: user.token
        });
    } catch (error) {
        console.error("Google callback error:", error);
        res.status(400).json({ error: "Failed to authenticate with Google" });
    }
});

module.exports = router;