class Solution {
    public List<Integer> zigZagOrder(TreeNode root) {
        List<Integer> order = new ArrayList<>();
        List<TreeNode> level = new ArrayList<>();
        if (root != null) {
            level.add(root);
        }
        for (int depth = 0; !level.isEmpty(); depth++) {
            List<Integer> values = new ArrayList<>();
            List<TreeNode> next = new ArrayList<>();
            for (TreeNode node : level) {
                values.add(node.val);
                if (node.left != null) {
                    next.add(node.left);
                }
                if (node.right != null) {
                    next.add(node.right);
                }
            }
            if (depth % 2 == 1) {
                Collections.reverse(values);
            }
            order.addAll(values);
            level = next;
        }
        return order;
    }
}
