const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    username: { type: String, required: true },
    review: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String } 
});

module.exports = mongoose.model("Review", reviewSchema);