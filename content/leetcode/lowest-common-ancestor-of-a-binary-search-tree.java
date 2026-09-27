class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        int lower = Math.min(p.val, q.val);
        int upper = Math.max(p.val, q.val);
        while (root != null) {
            if (root.val < lower) {
                root = root.right;
            } else if (root.val > upper) {
                root = root.left;
            } else {
                return root;
            }
        }
        return null;
    }
}
