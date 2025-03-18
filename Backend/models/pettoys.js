const mongoose = require("mongoose");

const petToysSchema = new mongoose.Schema({
    brand:String,
    productName:String,
    type:String,
    price:Number,
    rating:{
        stars:Number,
        noOfReviews:Number
    },
    image:String,
    animal:String
})

const petToysModal = mongoose.model("pettoys",petToysSchema);
module.exports = petToysModal;