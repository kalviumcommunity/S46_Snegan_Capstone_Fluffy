const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    petType: {
        type: String,
        enum: ["pet", "report"],
        default: "pet"
    },
    petAnimal: {
        type: String,
        required: function() {
            return this.petType === "pet";
        }
    },
    petName: {
        type: String,
        required: true
    },
    petBreed: {
        type: String,
        required: function() {
            return this.petType === "pet";
        }
    },
    petAge: {
        type: String,
        required: function() {
            return this.petType === "pet";
        }
    },
    petGender: {
        type: String,
        required: function() {
            return this.petType === "pet";
        }
    },
    petColor: {
        type: String,
        required: function() {
            return this.petType === "pet";
        }
    },
    petSize: {
        type: String,
        required: function() {
            return this.petType === "pet";
        }
    },
    petDescription: {
        type: String,
        required: true
    },
    petLastSeen: {
        type: String,
        required: function() {
            return this.petType === "report";
        }
    },
    petDateLost: {
        type: Date,
        required: function() {
            return this.petType === "pet";
        }
    },
    petLivesIn: {
        type: String,
        required: function() {
            return this.petType === "pet";
        }
    },
    petImage: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: function() {
            return this.petType === "report";
        }
    },
    contactPhone: {
        type: String,
        required: function() {
            return this.petType === "report";
        }
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

module.exports = mongoose.model("petdata", petSchema, "petdatas");
