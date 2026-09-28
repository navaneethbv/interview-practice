class Solution {
    public int longestConsecutive(TreeNode root) {
        if (root == null) {
            return 0;
        }
        List<TreeNode> order = new ArrayList<>();
        order.add(root);
        for (int index = 0; index < order.size(); index++) {
            TreeNode node = order.get(index);
            if (node.left != null) {
                order.add(node.left);
            }
            if (node.right != null) {
                order.add(node.right);
            }
        }
        Map<TreeNode, int[]> lengths = new IdentityHashMap<>();
        int best = 0;
        for (int index = order.size() - 1; index >= 0; index--) {
            TreeNode node = order.get(index);
            int[] pair = runs(node, lengths);
            lengths.put(node, pair);
            best = Math.max(best, pair[0] + pair[1] - 1);
        }
        return best;
    }

    private int[] runs(TreeNode node, Map<TreeNode, int[]> lengths) {
        int increasing = 1;
        int decreasing = 1;
        if (node.left != null) {
            int[] left = lengths.get(node.left);
            if ((long) node.left.val == (long) node.val + 1) {
                increasing = Math.max(increasing, left[0] + 1);
            }
            if ((long) node.left.val == (long) node.val - 1) {
                decreasing = Math.max(decreasing, left[1] + 1);
            }
        }
        if (node.right != null) {
            int[] right = lengths.get(node.right);
            if ((long) node.right.val == (long) node.val + 1) {
                increasing = Math.max(increasing, right[0] + 1);
            }
            if ((long) node.right.val == (long) node.val - 1) {
                decreasing = Math.max(decreasing, right[1] + 1);
            }
        }
        return new int[]{increasing, decreasing};
    }
}
