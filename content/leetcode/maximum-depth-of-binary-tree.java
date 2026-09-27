class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        List<TreeNode> queue = List.of(root);
        int depth = 0;
        while (!queue.isEmpty()) {
            depth++;
            queue = nextLevel(queue);
        }
        return depth;
    }

    private List<TreeNode> nextLevel(List<TreeNode> queue) {
        List<TreeNode> following = new ArrayList<>();
        for (TreeNode node : queue) {
            if (node.left != null) {
                following.add(node.left);
            }
            if (node.right != null) {
                following.add(node.right);
            }
        }
        return following;
    }
}
