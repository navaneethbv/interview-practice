class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        List<TreeNode> level = new ArrayList<>();
        if (root != null) {
            level.add(root);
        }
        while (!level.isEmpty()) {
            result.add(level.get(level.size() - 1).val);
            level = nextLevel(level);
        }
        return result;
    }

    private List<TreeNode> nextLevel(List<TreeNode> level) {
        List<TreeNode> children = new ArrayList<>();
        for (TreeNode node : level) {
            if (node.left != null) {
                children.add(node.left);
            }
            if (node.right != null) {
                children.add(node.right);
            }
        }
        return children;
    }
}
