class Solution {
    private record Frame(TreeNode node, boolean ready) {}

    public boolean isBalanced(TreeNode root) {
        Map<TreeNode, Integer> height = new IdentityHashMap<>();
        height.put(null, 0);
        Deque<Frame> pending = new ArrayDeque<>();
        pending.push(new Frame(root, false));
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
            if (Math.abs(leftHeight - rightHeight) > 1) {
                return false;
            }
            height.put(node, 1 + Math.max(leftHeight, rightHeight));
        }
        return true;
    }
}
