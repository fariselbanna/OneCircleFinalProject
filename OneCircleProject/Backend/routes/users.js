const express = require("express");
const router = express.Router();
const User = require("../models/User"); 

// Endpoint to get all users
router.get("/", async (req, res) => {
    try {
    const users = await User.find();        // Fetch all users from MongoDB
    console.log("Fetched users:", users);    // Debugging log to see fetched users
    res.json(users);    // Return the users in the response
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Endpoint to create a new user
router.post("/", async (req, res) => {
    console.log("POST /users request body:", req.body);     // Log incoming request body for debugging
    
    try {
          // Extract data from the request body
        const { name, age, profession } = req.body;
        
            // Ensure the required fields are provided
        if (!name || !age || !profession) {
            return res.status(400).send("Missing required fields");
        }

                  // Create a new user instance
                 const newUser = new User({ name, age, profession });

        // Save the user to the database
             const savedUser = await newUser.save();

          console.log("New user created:", savedUser); // Debugging log for saved user
        
         // Return the saved user as the response
         res.status(201).json(savedUser);
    }    catch (error) {
          console.error("Error creating user:", error);
              res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
