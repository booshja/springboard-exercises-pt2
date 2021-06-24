/** TreeNode: node for a general tree. */

class TreeNode {
    constructor(val, children = []) {
        this.val = val;
        this.children = children;
    }
}

class Tree {
    constructor(root = null) {
        this.root = root;
    }

    /** sumValues(): add up all of the values in the tree. */

    sumValues() {
        // if no root node, return total of 0
        if (!this.root) return 0;

        // initialize total as root value
        let total = this.root.val;

        // recursive function for counting children's values
        function doSum(node) {
            // loop through children
            for (let childNode of node.children) {
                // add childNode's value to total
                total += childNode.val;

                // if childNode has children, recurse with childNode
                if (childNode.children.length > 0) {
                    doSum(childNode);
                }
            }
        }

        // check for and add values of any children of root node
        doSum(this.root);
        return total;
    }

    /** countEvens(): count all of the nodes in the tree with even values. */

    countEvens() {
        // if no root node, return 0
        if (!this.root) return 0;

        // initialize total as 1 if root is even, 0 if not
        let total = this.root % 2 === 0 ? 1 : 0;

        // recursive function for iterating through children
        function doCount(node) {
            // loop through children
            for (let childNode of node.children) {
                // if value is even, add 1 to total
                if (childNode.val % 2 === 0) {
                    total += 1;
                }

                // if childNode has children, recurse with childNode
                doCount(childNode);
            }
        }

        // check the values of children and add if even
        doCount(this.root);
        return total;
    }

    /** numGreater(lowerBound): return a count of the number of nodes
     * whose value is greater than lowerBound. */

    numGreater(lowerBound) {
        // if no root node, return 0
        if (!this.root) return 0;

        // initialize total as 1 if root > lowerBound, 0 if not
        let total = this.root.val > lowerBound ? 1 : 0;

        // recursive function for iterating through & checking children vals
        function doNumCheck(node) {
            // loop through children
            for (let childNode of node.children) {
                // if val > lowerBound, add 1 to total
                if (childNode.val > lowerBound) {
                    total += 1;
                }

                // if childNode has children, recurse with childNode
                doNumCheck(childNode);
            }
        }

        // check the values of children and add if > lowerBound
        doNumCheck(this.root);
        return total;
    }
}

module.exports = { Tree, TreeNode };
