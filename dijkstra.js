class Graph {
    constructor() {
        this.vertices = {};
    }

    addVertex(vertex) {
        this.vertices[vertex] = {};
    }

    addEdge(source, destination, weight) {
        this.vertices[source][destination] = weight;
    }

    dijkstra(start) {
        const distances = {};
        const visited = {};
        const queue = [];

        // Initialize distances with Infinity and mark all vertices as unvisited
        for (let vertex in this.vertices) {
            distances[vertex] = Infinity;
            visited[vertex] = false;
        }

        distances[start] = 0; // Distance from start vertex to itself is 0
        queue.push({ vertex: start, distance: 0 });

        while (queue.length) {
            // Extract vertex with minimum distance from the queue
            queue.sort((a, b) => a.distance - b.distance);
            const { vertex } = queue.shift();

            // If vertex is already visited, skip
            if (visited[vertex]) continue;

            // Mark vertex as visited
            visited[vertex] = true;

            // Update distances of adjacent vertices
            for (let neighbor in this.vertices[vertex]) {
                const totalDistance = distances[vertex] + this.vertices[vertex][neighbor];
                if (totalDistance < distances[neighbor]) {
                    distances[neighbor] = totalDistance;
                    queue.push({ vertex: neighbor, distance: totalDistance });
                }
            }
        }

        return distances;
    }
}

// Example usage
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addEdge('A', 'B', 2);
graph.addEdge('A', 'C', 4);
graph.addEdge('B', 'D', 3);
graph.addEdge('C', 'D', 1);

const startVertex = 'A';
const distances = graph.dijkstra(startVertex);

console.log("Shortest distances from vertex", startVertex);
for (let vertex in distances) {
    console.log(vertex, ':', distances[vertex]);
}
