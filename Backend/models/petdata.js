const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    animal: String,
    type:String,
    name: String,
    age: String,
    size: String,
    breed: String,
    gender: String,
    color: String,
    image: String,
    description: String,
    lastSeen: String, 
    dateLost: String,
    livesin:String,
    owner:{
        name:String,
        email:String,
        phone:Number
    }
});

const PetModal = mongoose.model("petdatas", petSchema);
module.exports = PetModal;
