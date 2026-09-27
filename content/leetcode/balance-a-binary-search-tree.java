class Solution {
    public TreeNode balanceBST(TreeNode root) {
        List<Integer> values = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode node = root;
        while (node != null || !stack.isEmpty()) {
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
            node = stack.pop();
            values.add(node.val);
            node = node.right;
        }
        return build(values, 0, values.size());
    }

    private TreeNode build(List<Integer> values, int low, int high) {
        if (low >= high) {
            return null;
        }
        int middle = (low + high) / 2;
        TreeNode node = new TreeNode(values.get(middle));
        node.left = build(values, low, middle);
        node.right = build(values, middle + 1, high);
        return node;
    }
}
