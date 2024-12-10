const express = require("express");
const router = express.Router();
const Post = require("../models/Post");     // Connect to the Post model



    // Endpoint to get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();        // Fetch all posts from MongoDB
        res.json(posts); // Return the posts from the database
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Endpoint to create a new post
router.post("/", async (req, res) => {
    try {
        const { title, content, author } = req.body; // Extract data from the request body
        const newPost = new Post({ title, content, author }); // Create a new post instance
        const savedPost = await newPost.save(); // Save the post to the database
        res.status(201).json(savedPost); // Return the saved post as the response
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

