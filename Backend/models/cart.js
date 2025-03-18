const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    productname:String,
    productimage:String,
    productprice:Number,
})

const CartModal = mongoose.model("carts",CartSchema);
module.exports = CartModal;