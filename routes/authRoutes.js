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
const Booking = require("../models/Booking");

//GET
router.get("/", async (req, res) => {
    try{
        const allBookings = await Booking.find({});
        res.json(allBookings);
    } catch(err) {
        return res.status(500).json({ message: "Fel vid hämtning av alla bokningar..."})
    }
});

//POST
router.post("/", async (req, res) => {
    try{
        const {starter, mainCourse, dessert, customer} = req.body;

        const errors = [];

        //Validera input
        if(!starter){
            errors.push("Du måste välja en förrätt!")
        }  
        if( !mainCourse) {
            errors.push("Du måste välja en huvudrätt!")
        }  
        if(!dessert){
            errors.push("Du måste välja en efterrätt!")
        } 
        if(!customer.number){
            errors.push("Du måste fylla i ditt telefonummer!")
        } 
        if(errors.length > 0){
            return res.status(400).json({ error: errors });
        }

        if(errors.length == 0){
        //Korrekt input - spara bokning
        const booking = new Booking({ starter, mainCourse, dessert, customer });
        await booking.save();
        res.status(201).json({ message: "Bokning inlagd: " + booking});
        }
    } catch (error) {
        res.status(500).json({ error: "Server error"  + error});
    }
})

//DELETE
router.delete("/:id", async(req, res) => {
    try{
        //För att kunna få ut namnet till utskriften
        const deleteMeal = await Booking.findById(req.params.id);
        //Kollar om bokningen finns med i databas
        if(!deleteMeal){
            return res.status(404).json({message: "Bokningen finns inte i databasen"});
        }
        //Ta bort bokning
        await Booking.findByIdAndDelete(req.params.id, req.body, {new: true});
        //Skriv ut meddelande
        res.json({message: "Bokning avklarad och raderad: ", deleteMeal });
    } catch(err){
        //Serverfel
        res.status(500).json(({error: err.message}));
    }
})

//Returnera till anropet
module.exports = router;