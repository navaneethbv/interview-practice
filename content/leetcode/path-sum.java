class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) {
            return false;
        }

        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<Long> remainingSums = new ArrayDeque<>();
        nodes.push(root);
        remainingSums.push((long) targetSum);

        while (!nodes.isEmpty()) {
            TreeNode node = nodes.pop();
            long remainingSum = remainingSums.pop() - node.val;
            if (node.left == null && node.right == null && remainingSum == 0) {
                return true;
            }
            if (node.right != null) {
                nodes.push(node.right);
                remainingSums.push(remainingSum);
            }
            if (node.left != null) {
                nodes.push(node.left);
                remainingSums.push(remainingSum);
            }
        }

        return false;
    }
}
