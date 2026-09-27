class Solution {
    private record Frame(TreeNode node, boolean ready) {}

    public int diameterOfBinaryTree(TreeNode root) {
        Map<TreeNode, Integer> height = new IdentityHashMap<>();
        height.put(null, 0);
        Deque<Frame> pending = new ArrayDeque<>();
        pending.push(new Frame(root, false));
        int best = 0;
        while (!pending.isEmpty()) {
            Frame frame = pending.pop();
            TreeNode node = frame.node();
            if (node == null) {
                continue;
            }
            if (!frame.ready()) {
                pending.push(new Frame(node, true));
                pending.push(new Frame(node.left, false));
                pending.push(new Frame(node.right, false));
                continue;
            }
            int leftHeight = height.get(node.left);
            int rightHeight = height.get(node.right);
            best = Math.max(best, leftHeight + rightHeight);
            height.put(node, 1 + Math.max(leftHeight, rightHeight));
        }
        return best;
    }
}
