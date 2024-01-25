const mongoose = require("mongoose");
const validator = require('validator');
// creating db schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: [3, "Fullname should have a minimum length of 3"],
        maxLength: [20, "Fullname shouldn't exceed 20 charaters"],
        required: [true, "Please enter your fullname"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter your email"],
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    }
});
// creating db model 
// const User = mongoose.model('users', userSchema);
module.exports = mongoose.model('users', userSchema);
