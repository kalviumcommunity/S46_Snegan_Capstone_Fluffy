const mongoose = require("mongoose");

const petUsersSchema = new mongoose.Schema({
    name:String,
    email:String,
    provider:String,
    password:{
        type:String,
        required:function(){
            return this.provider!== "google"
        }
    }
})

const petUsersModal = mongoose.model("petusers",petUsersSchema);
module.exports = petUsersModal;