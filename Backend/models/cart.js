const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    // userId: {
    //     type: String,
    //     required: true
    // },
    productname: String,
    productimage: String,
    productprice: Number,
});

const CartModal = mongoose.model("carts", CartSchema);
module.exports = CartModal;