const express = require('express');
const router = express.Router();

// Example: Get all users
router.get('/', (req, res) => {
    // Here, I Wanr fetch users from my database MongoDB)
    res.json([{ name: 'John Doe', profession: 'Plumber', location: 'New York' }]);
});

// Example: Create a new user
    router.post('/', (req, res) => {
        const { name, profession, location } = req.body;
    // Here, I would save the user to my database
    res.status(201).json({ message: 'User created', user: { name, profession, location } });
});

module.exports = router;
