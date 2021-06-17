/** Node: node for a singly linked list. */

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/** LinkedList: chained together nodes. */

class LinkedList {
    constructor(vals = []) {
        this.head = null;
        this.tail = null;
        this.length = 0;

        for (let val of vals) this.push(val);
    }

    /** LinkedList utility methods */
    checkIfEmpty() {
        if (this.length == 0) {
            throw new Error("Cannot perform opertaion. List is empty.");
        }
    }

    /** push(val): add new value to end of list.
     * Returns undefined.
     **/

    push(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length += 1;
    }

    /** unshift(val): add new value to start of list.
     * Returns undefined.
     **/

    unshift(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length += 1;
    }

    /** pop(): Remove last item.
     * Throws error if list is empty.
     * Returns removed item.
     **/

    pop() {
        // check for empty list
        this.checkIfEmpty();

        // get node value to return
        const lastNodeVal = this.tail.val;

        // find last node
        let findNode = this.head;

        // if only one node in list, empty list, return val
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            this.length = 0;
            return lastNodeVal;
        }

        // find second to last node
        while (findNode.next != this.tail) {
            findNode = findNode.next;
        }

        // update LinkedList data
        this.tail = findNode;
        this.tail.next = null;
        this.length -= 1;

        return lastNodeVal;
    }

    /** shift(): Remove first item.
     * Throws error if list is empty.
     * Returns removed item.
     **/

    shift() {}

    /** getAt(idx): get val at idx.
     * Returns val.
     * Throws error if idx is invalid.
     **/

    getAt(idx) {}

    /** setAt(idx, val): set val at idx to val.
     * Returns undefined.
     * Throws error if idx is invalid.
     **/

    setAt(idx, val) {}

    /** insertAt(idx, val): add node w/val before idx.
     * Throws error if idx is invalid.
     * Returns undefined.
     */

    insertAt(idx, val) {}

    /** removeAt(idx): remove item at idx,
     * Throws error if idx is invalid.
     * Returns removed item.
     */

    removeAt(idx) {}

    /** average(): return an average of all values in the list */

    average() {}
}

module.exports = LinkedList;
