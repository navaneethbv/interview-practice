class Solution {
    private int moves;

    public int distributeCoins(TreeNode root) {
        moves = 0;
        balance(root);
        return moves;
    }

    private int balance(TreeNode node) {
        if (node == null) {
            return 0;
        }
        int leftExcess = balance(node.left);
        int rightExcess = balance(node.right);
        moves += Math.abs(leftExcess) + Math.abs(rightExcess);
        return node.val + leftExcess + rightExcess - 1;
    }
}
