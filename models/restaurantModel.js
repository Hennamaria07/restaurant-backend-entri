const mongoose = require("mongoose");

const restaurantShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your restaurant name"]
    },
    address: {
        type: String,
        required: [true, "Please enter your restaurant Address"]
    },
    neighborhood: {
        type: String,
        required: [true, "Please enter your restaurant neighborhood"]
    },
    photograph: {
        type: String,
        required: [true, "Please enter your restaurant photograph"]
    }
});

module.exports = new mongoose.model("restaurant", restaurantShema);