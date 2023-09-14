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
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (val > current.val) {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      } else {
        return this; // Ignore duplicate values
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, node = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < node.val) {
      if (!node.left) {
        node.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, node.left);
    } else if (val > node.val) {
      if (!node.right) {
        node.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, node.right);
    }

    return this; // Ignore duplicate values
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) {
        return current;
      } else if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined; // Not found
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node = this.root) {
    if (!node) {
      return undefined;
    }
    if (val === node.val) {
      return node;
    } else if (val < node.val) {
      return this.findRecursively(val, node.left);
    } else {
      return this.findRecursively(val, node.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(node = this.root, result = []) {
    if (node) {
      result.push(node.val);
      this.dfsPreOrder(node.left, result);
      this.dfsPreOrder(node.right, result);
    }
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(node = this.root, result = []) {
    if (node) {
      this.dfsInOrder(node.left, result);
      result.push(node.val);
      this.dfsInOrder(node.right, result);
    }
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(node = this.root, result = []) {
    if (node) {
      this.dfsPostOrder(node.left, result);
      this.dfsPostOrder(node.right, result);
      result.push(node.val);
    }
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const result = [];
    const queue = [];
    if (this.root) {
      queue.push(this.root);
    }
    while (queue.length) {
      const node = queue.shift();
      result.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    const removeNode = (node, val) => {
      if (!node) {
        return null;
      }

      if (val < node.val) {
        node.left = removeNode(node.left, val);
        return node;
      } else if (val > node.val) {
        node.right = removeNode(node.right, val);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null; // Node has no children
        } else if (!node.left) {
          return node.right; // Node has only a right child
        } else if (!node.right) {
          return node.left; // Node has only a left child
        }

        // Node has two children, find the minimum value in the right subtree
        let minNode = node.right;
        while (minNode.left) {
          minNode = minNode.left;
        }
        node.val = minNode.val;
        node.right = removeNode(node.right, minNode.val);
        return node;
      }
    };

    this.root = removeNode(this.root, val);
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const checkHeight = (node) => {
      if (!node) return 0;
      const leftHeight = checkHeight(node.left);
      const rightHeight = checkHeight(node.right);
      if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
        return -1; // The tree is not balanced
      }
      return Math.max(leftHeight, rightHeight) + 1;
    };

    return checkHeight(this.root) !== -1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */
  
  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }

    let current = this.root;
    while (current.right && current.right.right) {
      current = current.right;
    }

    if (!current.right && current.left) {
      // The rightmost node has no right child, find the maximum value in its left subtree
      current = current.left;
      while (current.right) {
        current = current.right;
      }
    }

    return current.val;
  }


}

module.exports = BinarySearchTree;
