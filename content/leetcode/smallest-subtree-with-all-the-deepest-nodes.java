class Solution {
    private static class SubtreeResult {
        final int depth;
        final TreeNode root;

        SubtreeResult(int depth, TreeNode root) {
            this.depth = depth;
            this.root = root;
        }
    }

    public TreeNode subtreeWithAllDeepest(TreeNode root) {
        return visit(root).root;
    }

    private SubtreeResult visit(TreeNode node) {
        if (node == null) {
            return new SubtreeResult(0, null);
        }
        SubtreeResult left = visit(node.left);
        SubtreeResult right = visit(node.right);
        if (left.depth == right.depth) {
            return new SubtreeResult(left.depth + 1, node);
        }
        if (left.depth > right.depth) {
            return new SubtreeResult(left.depth + 1, left.root);
        }
        return new SubtreeResult(right.depth + 1, right.root);
    }
}
