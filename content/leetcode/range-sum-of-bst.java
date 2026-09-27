class Solution {
    public int rangeSumBST(TreeNode root, int low, int high) {
        if (root == null) {
            return 0;
        }
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        int total = 0;
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (low <= node.val && node.val <= high) {
                total += node.val;
            }
            if (node.val > low && node.left != null) {
                stack.push(node.left);
            }
            if (node.val < high && node.right != null) {
                stack.push(node.right);
            }
        }
        return total;
    }
}
