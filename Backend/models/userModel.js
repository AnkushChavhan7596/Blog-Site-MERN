
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    
    email : {
        type : String,
        required : true,
        unique  : true
    },

    profileImage : {
        type : String,
        default : "https://rb.gy/pwxbgy",
        required : false
    },

    password : {
        type : String, 
        required : true
    },

    cPassword : {
        type : String, 
        required : true
    }
}, {timestamps : true});

const User = mongoose.model("user", userSchema);

module.exports = User;



