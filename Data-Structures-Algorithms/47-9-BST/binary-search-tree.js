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

    insertRecursively(val, currNode = this.root) {
        const newNode = new Node(val);

        // if tree is empty make new node the root
        if (!this.root) {
            this.root = newNode;
            return this;
        }

        if (val < currNode.val) {
            if (currNode.left === null) {
                currNode.left = newNode;
                return this;
            }
            return this.insertRecursively(val, currNode.left);
        } else {
            if (currNode.right === null) {
                currNode.right = newNode;
                return this;
            }
            return this.insertRecursively(val, currNode.right);
        }
    }

    /** find(val): search the tree for a node with value val.
     * return the node, if found; else undefined. Uses iteration. */

    find(val) {
        // if tree is empty return undefined
        if (!this.root) return undefined;

        let currNode = this.root;

        while (true) {
            if (val === currNode.val) {
                // if this is the right node, return it
                return currNode;
            } else if (val < currNode.val) {
                // if there's no child node, not found return undefined
                if (currNode.left === null) return undefined;
                // set current node to the next child down to continue search in loop
                currNode = currNode.left;
            } else if (val > currNode.val) {
                // if there's no child node, not found return undefined
                if (currNode.right === null) return undefined;
                // set current node to the next child down to continue search in loop
                currNode = currNode.right;
            }
        }
    }

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
