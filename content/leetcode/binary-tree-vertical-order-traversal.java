class Solution {
    public List<List<Integer>> verticalOrder(TreeNode root) {
        if (root == null) {
            return new ArrayList<>();
        }
        Map<Integer, List<Integer>> columns = new TreeMap<>();
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<Integer> positions = new ArrayDeque<>();
        nodes.add(root);
        positions.add(0);
        while (!nodes.isEmpty()) {
            TreeNode node = nodes.remove();
            int column = positions.remove();
            columns.computeIfAbsent(column, key -> new ArrayList<>()).add(node.val);
            if (node.left != null) {
                nodes.add(node.left);
                positions.add(column - 1);
            }
            if (node.right != null) {
                nodes.add(node.right);
                positions.add(column + 1);
            }
        }
        return new ArrayList<>(columns.values());
    }
}
