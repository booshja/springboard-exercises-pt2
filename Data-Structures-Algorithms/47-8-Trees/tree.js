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
        if (!this.root) return 0;
    }

    /** numGreater(lowerBound): return a count of the number of nodes
     * whose value is greater than lowerBound. */

    numGreater(lowerBound) {}
}

module.exports = { Tree, TreeNode };
