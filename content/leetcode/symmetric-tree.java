class Solution {
    public boolean isSymmetric(TreeNode root) {
        Deque<TreeNode[]> pending = new ArrayDeque<>();
        pending.add(new TreeNode[] {root.left, root.right});
        while (!pending.isEmpty()) {
            TreeNode[] pair = pending.remove();
            TreeNode leftNode = pair[0];
            TreeNode rightNode = pair[1];
            if (leftNode == null || rightNode == null) {
                if (leftNode != rightNode) {
                    return false;
                }
                continue;
            }
            if (leftNode.val != rightNode.val) {
                return false;
            }
            pending.add(new TreeNode[] {leftNode.left, rightNode.right});
            pending.add(new TreeNode[] {leftNode.right, rightNode.left});
        }
        return true;
    }
}
