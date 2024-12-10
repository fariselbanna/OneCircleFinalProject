const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'Frontend' directory
app.use(express.static(path.join(__dirname, '../Frontend')));

app.get('/', (req, res) => {
  
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'index.html'));
});

app.get('/users', (req, res) => {
  res.json([{ name: 'John Doe', profession: 'Developer', location: 'New York' }]);
});

// Startin the server
app.listen(port, () => {
  console.log(`OneCircle server is up and running on http://localhost:${port}`);
});
