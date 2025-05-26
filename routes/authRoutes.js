const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

//Ansluter till MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to database...");
})

//Booking model
const Booking = require("../models/Meal");

//GET
router.get("/", (req, res) => {
    res.json({ message: "Välkommen till API:et" });
})

router.get("/bookings", async (req, res) => {
    try{
        const allBookings = await Booking.find({});
        res.json(allBookings);
    } catch(err) {
        return res.status(500).json({ message: "Fel vid hämtning av alla bokningar..."})
    }
});

//DELETE
router.delete("/bookings/:id", async(req, res) => {
    try{
        //För att kunna få ut namnet till utskriften
        const deleteMeal = await Meal.findById(req.params.id);
        //Kollar om bokningen finns med i databas
        if(!deleteMeal){
            return res.status(404).json({message: "Måltiden finns inte i databasen"});
        }
        //Ta bort bokning
        await Meal.findByIdAndDelete(req.params.id, req.body, {new: true});
        //Skriv ut meddelande
        res.json({message: "Bokning avklarad och raderad: " + deleteMeal.mealname });
    } catch(error){
        //Serverfel
        res.status(500).json(error);
    }
})