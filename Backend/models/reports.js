const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ["pending", "in_progress", "resolved"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Report", reportSchema); 