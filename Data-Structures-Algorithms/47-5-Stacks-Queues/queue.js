/** Node: node for a queue. */

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    /** enqueue(val): add new value to end of the queue. Returns undefined. */

    enqueue(val) {
        const newNode = new Node(val);

        // if queue is empty make new item the only item in queue
        if (this.isEmpty()) {
            this.first = newNode;
            this.last = newNode;
            this.size = 1;
            return undefined;
        }

        // add newNode to end of queue, update queue size
        this.last.next = newNode;
        this.last = newNode;
        this.size += 1;

        return undefined;
    }

    /** dequeue(): remove the node from the start of the queue
     * Return removed value.
     * Should throw an error if the queue is empty. */

    dequeue() {
        // throw error if queue is empty
        if (this.isEmpty()) throw new Error("Empty Queue, nothing to remove.");

        // remove first item and return val
        const dequeueVal = this.first.val;
        if (this.size === 1) {
            // if queue only has one item, empty queue
            this.first = null;
            this.last = null;
            this.size = 0;
            return dequeueVal;
        }
        const secondNode = this.first.next;
        this.first = secondNode;
        this.size -= 1;

        return dequeueVal;
    }

    /** peek(): return the value of the first node in the queue. */

    peek() {
        if (this.isEmpty()) return null;
        return this.first.val;
    }

    /** isEmpty(): return true if the queue is empty, otherwise false */

    isEmpty() {
        return this.size > 0 ? false : true;
    }
}

module.exports = Queue;
