class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (same(node, subRoot)) {
                return true;
            }
            if (node.left != null) {
                stack.push(node.left);
            }
            if (node.right != null) {
                stack.push(node.right);
            }
        }
        return false;
    }

    private boolean same(TreeNode first, TreeNode second) {
        Deque<TreeNode[]> pairs = new ArrayDeque<>();
        pairs.push(new TreeNode[] {first, second});
        while (!pairs.isEmpty()) {
            TreeNode[] pair = pairs.pop();
            first = pair[0];
            second = pair[1];
            if (first == null || second == null) {
                if (first != second) {
                    return false;
                }
                continue;
            }
            if (first.val != second.val) {
                return false;
            }
            pairs.push(new TreeNode[] {first.left, second.left});
            pairs.push(new TreeNode[] {first.right, second.right});
        }
        return true;
    }
}
