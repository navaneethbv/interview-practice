class Solution {
    public int maxSumBST(TreeNode root) {
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
        Map<TreeNode, long[]> info = new IdentityHashMap<>();
        info.put(null, new long[] {1, Long.MAX_VALUE, Long.MIN_VALUE, 0});
        int best = 0;
        for (int index = order.size() - 1; index >= 0; index--) {
            TreeNode node = order.get(index);
            long[] leftInfo = info.get(node.left);
            long[] rightInfo = info.get(node.right);
            boolean valid = leftInfo[0] == 1 && rightInfo[0] == 1
                    && leftInfo[2] < node.val && node.val < rightInfo[1];
            long sum = leftInfo[3] + rightInfo[3] + node.val;
            long minimum = Math.min(node.val, leftInfo[1]);
            long maximum = Math.max(node.val, rightInfo[2]);
            info.put(node, new long[] {valid ? 1 : 0, minimum, maximum, sum});
            if (valid) {
                best = Math.max(best, (int) sum);
            }
        }
        return best;
    }
}
