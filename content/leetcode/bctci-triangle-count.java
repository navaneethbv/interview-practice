class Solution {
    public int countTriangles(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int pairs = 0;
        TreeNode left = root.left;
        TreeNode right = root.right;
        while (left != null && right != null) {
            pairs++;
            left = left.left;
            right = right.right;
        }
        return pairs + countTriangles(root.left) + countTriangles(root.right);
    }
}
