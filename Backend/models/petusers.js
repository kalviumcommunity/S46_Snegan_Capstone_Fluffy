const mongoose = require("mongoose");

const petUsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String
    }
});

const PetUsersModal = mongoose.model("petusers", petUsersSchema);
module.exports = PetUsersModal;