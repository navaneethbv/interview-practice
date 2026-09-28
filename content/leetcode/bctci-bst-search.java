class Solution {
    public boolean bstContains(TreeNode root, int target) {
        TreeNode node = root;
        while (node != null) {
            if (node.val == target) {
                return true;
            }
            node = target < node.val ? node.left : node.right;
        }
        return false;
    }
}
