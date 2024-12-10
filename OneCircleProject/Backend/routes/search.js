const express = require('express');
const router = express.Router();

// Example: Search professionals based on a query
router.get('/', (req, res) => {
    const query = req.query.query; // This is the search term sent by the client
    //  i would typically query my database here
         res.json([{ name: 'John Doe', profession: 'Plumber', location: 'New York' }]);
});

module.exports = router;
