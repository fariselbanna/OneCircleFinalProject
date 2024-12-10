const express = require('express');
const Graph = require('./models/Graph'); 
const app = express();
const PORT = 3000;

// Middleware to serve static files and parse JSON
app.use(express.static('public'));
app.use(express.json());

// Initialize the Graph
    const professionalGraph = new Graph();
    professionalGraph.addNode("Faris Elbanna");
professionalGraph.addNode("Dominic Dabish");
professionalGraph.addNode("Alice Johnson");
professionalGraph.addNode("Jane Doe");
professionalGraph.addNode("Michael Green");
professionalGraph.addNode("Amara Singh");

// Add connections
professionalGraph.addEdge("Alice Johnson", "Dominic Dabish");
professionalGraph.addEdge("Dominic Dabish", "Michael Green");
professionalGraph.addEdge("Dominic Dabish", "Amara Singh");
professionalGraph.addEdge("Alice Johnson", "Jane Doe");

// Debug: Log graph initialization
console.log("Graph initialized with nodes and edges:");
console.log(professionalGraph.adjacencyList);

// Test data (users list for other endpoints)
const users = [
    { id: 1, name: "Faris Elbanna", profession: "Student", location: "San Diego" },
    { id: 2, name: "Dominic Dabish", profession: "Professor", location: "Detroit" },
    { id: 3, name: "Alice Johnson", profession: "Engineer", location: "San Diego" },
];

// Routes

// List all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Add a new user
app.post('/users', (req, res) => {
    const { name, profession, location } = req.body;
    if (!name || !profession || !location) {
        return res.status(400).json({ message: "All fields are required" });
    }

    users.push({ id: users.length + 1, name, profession, location });
    professionalGraph.addNode(name); // Add user to the graph
    res.status(201).json({ message: "User added successfully", user: { name, profession, location } });
});

// Search users by name
app.get('/search', (req, res) => {
    const query = req.query.query || "";
    const results = users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
    res.json(results);
});

// Connect two professionals
app.post('/connect', (req, res) => {
    console.log("Request received at /connect");
    console.log("Request body:", req.body);

    const { person1, person2 } = req.body;

    // Validate input
    if (!person1 || !person2) {
        return res.status(400).json({ message: "Both person1 and person2 are required" });
    }

    // Check if both professionals exist in the graph
    if (!professionalGraph.adjacencyList[person1] || !professionalGraph.adjacencyList[person2]) {
        console.log("One or both professionals not found in the graph");
        return res.status(404).json({ message: "One or both professionals not found" });
    }

    // Add the connection
    professionalGraph.addEdge(person1, person2);

    console.log("Connection added successfully");
    res.json({
        message: `Connection established between ${person1} and ${person2}`,
        graph: professionalGraph.adjacencyList,
    });
});

// Find path between two professionals
app.get('/path', (req, res) => {
    console.log("Request received at /path");
    const { start, target } = req.query;

    // Validate input
    if (!start || !target) {
        return res.status(400).json({ message: "Both start and target are required" });
    }

    console.log("Start:", start, "Target:", target);

    // Check if both professionals exist
    if (!professionalGraph.adjacencyList[start] || !professionalGraph.adjacencyList[target]) {
        console.log("One or both professionals not found in the graph");
        return res.status(404).json({ message: "One or both professionals not found" });
    }

    // Find path
    const path = professionalGraph.findPathBFS(start, target);

    if (path) {
        console.log("Path found:", path);
        res.json({ path });
    } else {
        console.log("No connection found");
        res.status(404).json({ message: "No connection found" });
    }
});

// Debugging endpoint for testing JSON parsing
app.post('/test', (req, res) => {
    console.log("Request body in /test:", req.body);
    res.json(req.body);
});

// Example endpoints for category and proximity
app.get('/categories', (req, res) => {
    const professionalsTree = {
        "Plumbing": ["John Doe"],
        "Electrician": ["Jane Smith"],
        "Painting": ["Alice Brown"]
    };
    const category = req.query.category;
    res.json(professionalsTree[category] || []);
});

app.get('/nearby', (req, res) => {
    const proximityGraph = {
        "New York": ["John Doe", "Alice Brown"],
        "San Francisco": ["Jane Smith"]
    };
    const city = req.query.city;
    res.json(proximityGraph[city] || []);
});

// Debug: Log all registered routes
console.log("Registered routes:");
app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`${r.route.stack[0].method.toUpperCase()} ${r.route.path}`);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
