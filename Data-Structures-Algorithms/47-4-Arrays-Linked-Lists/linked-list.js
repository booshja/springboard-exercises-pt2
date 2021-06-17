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

    /** push(val): add new value to end of list. Returns undefined. */

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

    /** unshift(val): add new value to start of list. Returns undefined. */

    unshift(val) {}

    /** pop(): Remove last item. Returns removed item. */

    pop() {}

    /** shift(): Remove first item. Returns removed item. */

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
