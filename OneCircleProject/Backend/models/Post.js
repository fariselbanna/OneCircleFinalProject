const express = require('express');
const router = express.Router();

// Example: Get all posts
router.get('/', (req, res) => {
    // Return some dummy posts
    res.json([{ title: 'Need a plumber', description: 'Looking for a local plumber in New York' }]);
});

module.exports = router;
