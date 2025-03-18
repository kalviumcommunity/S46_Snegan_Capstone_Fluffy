const mongoose = require("mongoose")

const petFoodSchema = new mongoose.Schema({
    brand:String,
    type:String,
    productName:String,
    age:String,
    price:Number,
    rating: {
        stars:Number,
        numberOfReviews:Number,
      },
    image:String,
    animal:String
})

const petFoodModal = mongoose.model("petfoods",petFoodSchema);
module.exports = petFoodModal;