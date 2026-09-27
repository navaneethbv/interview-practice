class Solution {
public int maxProduct(TreeNode root) {
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
    Map<TreeNode, Long> sums = new IdentityHashMap<>();
    sums.put(null, 0L);
    for (int index = order.size() - 1; index >= 0; index--) {
        TreeNode node = order.get(index);
        long subtreeSum = node.val + sums.get(node.left) + sums.get(node.right);
        sums.put(node, subtreeSum);
    }
    long total = sums.get(root);
    long best = 0;
    for (int index = 1; index < order.size(); index++) {
        long subtreeSum = sums.get(order.get(index));
        best = Math.max(best, subtreeSum * (total - subtreeSum));
    }
    return (int) (best % 1000000007);
}
}
