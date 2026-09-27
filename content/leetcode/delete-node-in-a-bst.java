class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        TreeNode parent = null;
        TreeNode current = root;
        while (current != null && current.val != key) {
            parent = current;
            if (key < current.val) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        if (current == null) {
            return root;
        }
        if (current.left != null && current.right != null) {
            TreeNode successorParent = current;
            TreeNode successor = current.right;
            while (successor.left != null) {
                successorParent = successor;
                successor = successor.left;
            }
            current.val = successor.val;
            parent = successorParent;
            current = successor;
        }

        TreeNode child = current.left != null ? current.left : current.right;
        if (parent == null) {
            return child;
        }
        if (parent.left == current) {
            parent.left = child;
        } else {
            parent.right = child;
        }
        return root;
    }
}
