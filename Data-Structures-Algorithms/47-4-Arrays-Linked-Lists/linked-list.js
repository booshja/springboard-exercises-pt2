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

    checkIfInvalidIdx(idx) {
        if (idx > this.length || idx < 0) {
            throw new Error("Invalid index.");
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

        return undefined;
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

        return undefined;
    }

    /** pop(): Remove last item.
     * Throws error if list is empty.
     * Returns removed item.
     **/

    pop() {
        // if list is empty, throw error
        this.checkIfEmpty();

        // get node value to return
        const lastNodeVal = this.tail.val;

        // if only one node in list, empty list, return val
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            this.length = 0;
            return lastNodeVal;
        }

        // find second to last node
        let findNode = this.head;
        while (findNode.next != this.tail) {
            findNode = findNode.next;
        }

        // make findNode last node, update list length
        this.tail = findNode;
        this.tail.next = null;
        this.length -= 1;

        return lastNodeVal;
    }

    /** shift(): Remove first item.
     * Throws error if list is empty.
     * Returns removed val.
     **/

    shift() {
        // if list is empty, throw error
        this.checkIfEmpty();

        //get node value to return
        const firstNodeVal = this.head.val;

        // if only one node in list, reset list, return val
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            this.length = 0;
            return firstNodeVal;
        }

        // get second node for new head
        const newHeadNode = this.head.next;

        // make newHeadNode first node, update list length
        this.head = newHeadNode;
        this.length -= 1;

        return firstNodeVal;
    }

    /** getAt(idx): get val at idx.
     * Returns val.
     * Throws error if idx is invalid.
     **/

    getAt(idx) {
        // if empty list, throw error
        this.checkIfEmpty();
        // if invalid idx, throw error
        this.checkIfInvalidIdx(idx);

        // loop through to correct node
        let currNode = this.head;
        for (let i = 0; i < idx; i++) {
            currNode = currNode.next;
        }

        return currNode.val;
    }

    /** setAt(idx, val): set val at idx to val.
     * Returns undefined.
     * Throws error if idx is invalid.
     **/

    setAt(idx, val) {
        // if empty list, throw error
        this.checkIfEmpty();
        // if invalid idx, throw error
        this.checkIfInvalidIdx(idx);

        // loop through to correct node
        let currNode = this.head;
        for (let i = 0; i < idx; i++) {
            currNode = currNode.next;
        }

        // set currNode.val to val
        currNode.val = val;

        return undefined;
    }

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
