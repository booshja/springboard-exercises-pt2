class Node {
    constructor(value, adjacent = new Set()) {
        this.value = value;
        this.adjacent = adjacent;
    }
}

class Graph {
    constructor() {
        this.nodes = new Set();
    }

    // this function accepts a Node instance and adds it to the nodes property on the graph
    addVertex(vertex) {
        this.nodes.add(vertex);
    }

    // this function accepts an array of Node instances and adds them to the nodes property on the graph
    addVertices(vertexArray) {
        for (let vertex of vertexArray) {
            this.addVertex(vertex);
        }
    }

    // this function accepts two vertices and updates their adjacent values to include the other vertex
    addEdge(v1, v2) {
        v1.adjacent.add(v2);
        v2.adjacent.add(v1);
    }

    // this function accepts two vertices and updates their adjacent values to remove the other vertex
    removeEdge(v1, v2) {
        v1.adjacent.delete(v2);
        v2.adjacent.delete(v1);
    }

    // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
    removeVertex(vertex) {
        if (vertex.adjacent) {
            for (let vert of vertex.adjacent) {
                this.removeEdge(vert, vertex);
            }
        }
        this.nodes.delete(vertex);
    }

    // this function returns an array of Node values using DFS
    depthFirstSearch(start) {
        const seen = new Set();
        const result = [];

        function doDFS(vertex) {
            // Base Case
            if (!vertex) return null;

            seen.add(vertex);
            result.push(vertex.value);

            vertex.adjacent.forEach((neighbor) => {
                if (!seen.has(neighbor)) {
                    return doDFS(neighbor);
                }
            });
        }

        doDFS(start);
        return result;
    }

    // this function returns an array of Node values using BFS
    breadthFirstSearch(start) {
        const toVisitQueue = [start];
        let seen = new Set(toVisitQueue);
        const result = [start.value];

        while (toVisitQueue.length) {
            let currVertex = toVisitQueue.shift();

            for (let neighbor of currVertex.adjacent) {
                if (!seen.has(neighbor)) {
                    toVisitQueue.push(neighbor);
                    seen.add(neighbor);
                    result.push(neighbor.value);
                }
            }
        }

        return result;
    }
}

module.exports = { Graph, Node };
