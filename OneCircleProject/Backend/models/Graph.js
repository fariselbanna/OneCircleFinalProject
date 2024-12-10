class Graph {
    constructor() {
        this.adjacencyList = {};    // Represents the graph as an adjacency list
    }

                // Add a professional to the graph
    addNode(professional) {
        if (!this.adjacencyList[professional]) {
            this.adjacencyList[professional] = [];
        }
    }

        // Add a connection (edge) between two professionals
    addEdge(professional1, professional2) {
        if (this.adjacencyList[professional1] && this.adjacencyList[professional2]) {
            if (!this.adjacencyList[professional1].includes(professional2)) {
                this.adjacencyList[professional1].push(professional2);
            }
            if (!this.adjacencyList[professional2].includes(professional1)) {
                this.adjacencyList[professional2].push(professional1);
            }
        }
    }

            // Find a path between two professionals using BFS
    findPathBFS(start, target) {
        const queue = [[start]];
        const visited = new Set();

        while (queue.length > 0) {
            const path = queue.shift();
            const node = path[path.length - 1];

            if (node === target) {
                return path; // Return the path if target is found
            }

            if (!visited.has(node)) {
                visited.add(node);
                for (const neighbor of this.adjacencyList[node]) {
                    const newPath = [...path, neighbor];
                    queue.push(newPath);
                }
            }
        }

        return null; // No path found
    }
}

// Export the Graph class to use in other files
module.exports = Graph;
