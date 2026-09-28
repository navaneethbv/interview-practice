class Solution {
    private int best = 0;

    public int longestAlignedPath(TreeNode root) {
        chain(root, 0);
        return best;
    }

    private int chain(TreeNode node, int depth) {
        if (node == null) {
            return 0;
        }
        int left = chain(node.left, depth + 1);
        int right = chain(node.right, depth + 1);
        if (node.val != depth) {
            return 0;
        }
        best = Math.max(best, left + right + 1);
        return Math.max(left, right) + 1;
    }
}
