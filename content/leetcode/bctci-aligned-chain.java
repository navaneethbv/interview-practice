class Solution {
    private int best = 0;

    public int longestAlignedChain(TreeNode root) {
        chain(root, 0);
        return best;
    }

    private int chain(TreeNode node, int depth) {
        if (node == null) {
            return 0;
        }
        int below = Math.max(chain(node.left, depth + 1), chain(node.right, depth + 1));
        if (node.val != depth) {
            return 0;
        }
        best = Math.max(best, below + 1);
        return below + 1;
    }
}
