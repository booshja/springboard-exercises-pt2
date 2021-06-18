/** Node: node for a stack. */

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    /** push(val): add new value to end of the stack. Returns undefined. */

    push(val) {
        const newNode = new Node(val);

        // if stack is empty, set new item to be the only one in it
        if (this.size === 0) {
            this.first = newNode;
            this.last = newNode;
            this.size = 1;
            return undefined;
        }

        // set new item to top of stack, update size, return undefined
        newNode.next = this.first;
        this.first = newNode;
        this.size += 1;
        return undefined;
    }

    /** pop(): remove the node from the top of the stack
     * and return its value. Should throw an error if the stack is empty. */

    pop() {
        // if stack is empty, throw error
        if (this.isEmpty()) throw new Error("Cannot pop from empty stack.");

        // get value to return
        const popVal = this.first.val;

        // if only one item in stack, empty stack and return val
        if (this.size === 1) {
            this.first = null;
            this.last = null;
            this.size = 0;
            return popVal;
        }

        // set second item to first in stack, return val
        const secondNode = this.first.next;
        this.first = secondNode;
        this.size -= 1;

        return popVal;
    }

    /** peek(): return the value of the first node in the stack. */

    peek() {
        return this.size > 0 ? this.first.val : null;
    }

    /** isEmpty(): return true if the stack is empty, otherwise false */

    isEmpty() {
        return this.size > 0 ? false : true;
    }
}

module.exports = Stack;
