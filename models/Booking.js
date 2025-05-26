const mongoose = require("mongoose");

//Meal Schema
const BookingSchema = new mongoose.Schema({
    starter: {
        type: String,
        required: [true, "Du måste skicka med en förrätt"]
    },
    mainCourse: {
        type: [String],
        required: [true, "Du måste skicka med en huvudrätt"]
    },
    dessert: {
        type: String,
        required: [true, "Du måste skicka med en efterrätt"]
    },
    created: {
        type: Date,
        default: Date.now
    }
})

const Meal = mongoose.model("Booking", BookingSchema);
module.exports = Meal;