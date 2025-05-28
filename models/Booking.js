const mongoose = require("mongoose");

//Meal Schema
const BookingSchema = new mongoose.Schema({
    starter: {
        type: String,
        required: [true, "Du måste skicka med en förrätt"]
    },
    mainCourse: {
        type: String,
        required: [true, "Du måste skicka med en huvudrätt"]
    },
    dessert: {
        type: String,
        required: [true, "Du måste skicka med en efterrätt"]
    },
    created: {
        type: Date,
        default: Date.now
    },
    customer: {
        firstname: {
            type: String,
            required: [false]
        },
        lastname: {
            type: String,
            required: [false]
        },
        number: {
            type: String,
            required: [true, "Du måste skicka med ditt telefonnummer"]
        }
    }
})

const Meal = mongoose.model("Booking", BookingSchema);
module.exports = Meal;