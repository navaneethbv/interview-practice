class Solution {
    public List<TreeNode> generateTrees(int n) {
        return build(1, n);
    }

    private List<TreeNode> build(int low, int high) {
        List<TreeNode> trees = new ArrayList<>();
        if (low > high) {
            trees.add(null);
            return trees;
        }
        for (int value = low; value <= high; value++) {
            List<TreeNode> leftTrees = build(low, value - 1);
            List<TreeNode> rightTrees = build(value + 1, high);
            for (TreeNode left : leftTrees) {
                for (TreeNode right : rightTrees) {
                    TreeNode node = new TreeNode(value);
                    node.left = left;
                    node.right = right;
                    trees.add(node);
                }
            }
        }
        return trees;
    }
}
