/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree {
    constructor(root = null) {
        this.root = root;
    }

    /** minDepth(): return the minimum depth of the tree -- that is,
     * the length of the shortest path from the root to a leaf. */

    minDepth() {
        // return 0 if no root node
        if (!this.root) return 0;

        // recursive function for iterating through children
        function doMinDepth(node) {
            // if no children, return 1
            if (node.left === null && node.right === null) return 1;
            // if node.right has children, return the count of those, plus 1;
            if (node.left === null) return doMinDepth(node.right) + 1;
            // if node.left has children, return the count of those, plus 1
            if (node.right === null) return doMinDepth(node.left) + 1;
            // else, both have children, return the minimum of each path, plus 1
            return Math.min(doMinDepth(node.left), doMinDepth(node.right)) + 1;
        }

        return doMinDepth(this.root);
    }

    /** maxDepth(): return the maximum depth of the tree -- that is,
     * the length of the longest path from the root to a leaf. */

    maxDepth() {
        // return 0 if no root node
        if (!this.root) return 0;

        // recursive function for iterating through children
        function doMaxDepth(node) {
            // if no children, return 1
            if (node.left === null && node.right === null) return 1;
            // if node.right has children, return the count of those, plus 1
            if (node.left === null) return doMaxDepth(node.right) + 1;
            // if node.left has children, return the count of those, plus 1
            if (node.right === null) return doMaxDepth(node.left) + 1;
            // else, both have children, return the max of each path, plus 1;
            return Math.max(doMaxDepth(node.left), doMaxDepth(node.right)) + 1;
        }

        return doMaxDepth(this.root);
    }

    /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
     * The path doesn't need to start at the root, but you can't visit a node more than once. */

    maxSum() {
        let sum = 0;

        // recursive function for iterating through children
        function doMaxSum(node) {
            if (node === null) return 0;
            // sum all the left children from node
            const leftSum = doMaxSum(node.left);
            // sum all the right children from node
            const rightSum = doMaxSum(node.right);
            // sum is the max of sum or the node plus children sums
            sum = Math.max(sum, node.val + leftSum + rightSum);
            // return 0 or summed values, whichever is larger
            return Math.max(0, leftSum + node.val, rightSum + node.val);
        }

        doMaxSum(this.root);
        return sum;
    }

    /** nextLarger(lowerBound): return the smallest value in the tree
     * which is larger than lowerBound. Return null if no such value exists. */

    nextLarger(lowerBound) {
        // if no root node, return null
        if (!this.root) return null;

        // use BFS
        let queue = [this.root];
        let closest = null;

        while (queue.length) {
            let currNode = queue.shift();
            let currVal = currNode.val;
            let biggerThanBound = currVal > lowerBound;
            let shouldReassignClosest = currVal < closest || closest === null;

            if (biggerThanBound && shouldReassignClosest) {
                closest = currVal;
            }

            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);
        }

        return closest;
    }
}

module.exports = { BinaryTree, BinaryTreeNode };
