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

    checkIfInvalidIdxOrEmpty(idx) {
        if (idx > this.length || idx < 0) {
            if (this.length > 0) {
                throw new Error("Invalid index.");
            }
        }
    }

    emptyList() {
        this.head = null;
        this.tail = null;
        this.length = 0;
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
            this.emptyList();
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
            this.emptyList();
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

    insertAt(idx, val) {
        // if idx is invalid, throw error
        this.checkIfInvalidIdxOrEmpty(idx);

        const newNode = new Node(val);

        // if empty list, add node and return
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
            this.length = 1;
            return undefined;
        }

        // loop through to get nodes
        let beforeNode = this.head;
        for (let i = 1; i < idx; i++) {
            beforeNode = beforeNode.next;
        }
        const afterNode = beforeNode.next;

        // set new values for insertion
        beforeNode.next = newNode;
        if (!afterNode) {
            this.tail = newNode;
        } else {
            newNode.next = afterNode;
        }
        this.length += 1;

        return undefined;
    }

    /** removeAt(idx): remove item at idx,
     * Throws error if idx is invalid.
     * Returns removed item.
     */

    removeAt(idx) {
        // if empty list, throw error
        this.checkIfEmpty();
        // if invalid idx, throw error
        this.checkIfInvalidIdx(idx);

        // if only item in list, set list to be empty and return
        if (this.length === 1) {
            const removeVal = this.head.val;
            this.emptyList();
            return removeVal;
        }

        // if removing head, set new head value and length and return former head val
        if (idx === 0) {
            const removeVal = this.head.val;
            this.head = this.head.next;
            this.length -= 1;
            return removeVal;
        }

        // loop through to nodes
        let beforeNode = this.head;
        for (let i = 1; i < idx; i++) {
            beforeNode = beforeNode.next;
        }
        const removeNodeVal = beforeNode.next.val;
        // if removing tail, set new tail value and length and return former tail val
        if (idx === this.length - 1) {
            this.tail = beforeNode;
            this.length -= 1;
            return removeNodeVal;
        }
        // else set after node
        const afterNode = beforeNode.next.next;

        // set new values for post removal
        beforeNode.next = afterNode;
        this.length -= 1;

        return removeNodeVal;
    }

    /** average(): return an average of all values in the list
     * Returns 0 if empty list
     */

    average() {
        // if empty list, return 0
        if (this.length === 0) {
            return 0;
        }

        // sum all items in list
        let currNode = this.head;
        let totalSum = currNode.val;
        for (let i = 1; i < this.length; i++) {
            currNode = currNode.next;
            totalSum = totalSum + currNode.val;
        }

        // return average
        return totalSum / this.length;
    }
}

module.exports = LinkedList;
