class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class BinarySearchTree {
    constructor(root = null) {
        this.root = root;
    }

    /** insert(val): insert a new node into the BST with value val.
     * Returns the tree. Uses iteration. */

    insert(val) {
        const newNode = new Node(val);
        // insert single node as root if tree is empty and returns
        if (!this.root) {
            this.root = newNode;
            return this;
        }

        let currNode = this.root;
        while (true) {
            if (val < currNode.val) {
                // if value is lower than current node
                if (currNode.left === null) {
                    currNode.left = newNode;
                    return this;
                } else {
                    currNode = currNode.left;
                }
            } else if (val > currNode.val) {
                // if value is higher than current node
                if (currNode.right === null) {
                    currNode.right = newNode;
                    return this;
                } else {
                    currNode = currNode.right;
                }
            }
        }
    }

    /** insertRecursively(val): insert a new node into the BST with value val.
     * Returns the tree. Uses recursion. */

    insertRecursively(val) {}

    /** find(val): search the tree for a node with value val.
     * return the node, if found; else undefined. Uses iteration. */

    find(val) {}

    /** findRecursively(val): search the tree for a node with value val.
     * return the node, if found; else undefined. Uses recursion. */

    findRecursively(val) {}

    /** dfsPreOrder(): Traverse the array using pre-order DFS.
     * Return an array of visited nodes. */

    dfsPreOrder() {}

    /** dfsInOrder(): Traverse the array using in-order DFS.
     * Return an array of visited nodes. */

    dfsInOrder() {}

    /** dfsPostOrder(): Traverse the array using post-order DFS.
     * Return an array of visited nodes. */

    dfsPostOrder() {}

    /** bfs(): Traverse the array using BFS.
     * Return an array of visited nodes. */

    bfs() {}
}

module.exports = BinarySearchTree;
