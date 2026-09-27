class Solution {
    public List<Integer> boundaryOfBinaryTree(TreeNode root) {
        List<Integer> boundary = new ArrayList<>();
        boundary.add(root.val);
        if (isLeaf(root)) {
            return boundary;
        }

        addLeftBoundary(root.left, boundary);
        addLeaves(root, boundary);
        List<Integer> rightBoundary = new ArrayList<>();
        addRightBoundary(root.right, rightBoundary);
        Collections.reverse(rightBoundary);
        boundary.addAll(rightBoundary);
        return boundary;
    }

    private void addLeftBoundary(TreeNode node, List<Integer> boundary) {
        while (node != null) {
            if (!isLeaf(node)) {
                boundary.add(node.val);
            }
            node = node.left != null ? node.left : node.right;
        }
    }

    private void addRightBoundary(TreeNode node, List<Integer> boundary) {
        while (node != null) {
            if (!isLeaf(node)) {
                boundary.add(node.val);
            }
            node = node.right != null ? node.right : node.left;
        }
    }

    private void addLeaves(TreeNode root, List<Integer> boundary) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (isLeaf(node)) {
                boundary.add(node.val);
            }
            if (node.right != null) {
                stack.push(node.right);
            }
            if (node.left != null) {
                stack.push(node.left);
            }
        }
    }

    private boolean isLeaf(TreeNode node) {
        return node.left == null && node.right == null;
    }
}
