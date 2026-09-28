class Solution {
    public int longestConsecutive(TreeNode root) {
        if (root == null) {
            return 0;
        }
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<Integer> lengths = new ArrayDeque<>();
        nodes.push(root);
        lengths.push(1);
        int best = 0;
        while (!nodes.isEmpty()) {
            TreeNode node = nodes.pop();
            int length = lengths.pop();
            best = Math.max(best, length);
            addChild(node.left, node, length, nodes, lengths);
            addChild(node.right, node, length, nodes, lengths);
        }
        return best;
    }

    private void addChild(TreeNode child, TreeNode parent, int length,
            Deque<TreeNode> nodes, Deque<Integer> lengths) {
        if (child == null) {
            return;
        }
        int nextLength = child.val == parent.val + 1 ? length + 1 : 1;
        nodes.push(child);
        lengths.push(nextLength);
    }
}
