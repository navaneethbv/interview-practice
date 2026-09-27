class Solution {
    private record Frame(TreeNode node, int maximum) {}

    public int goodNodes(TreeNode root) {
        Deque<Frame> pending = new ArrayDeque<>();
        pending.push(new Frame(root, root.val));
        int count = 0;
        while (!pending.isEmpty()) {
            Frame frame = pending.pop();
            TreeNode node = frame.node();
            int maximum = frame.maximum();
            if (node.val >= maximum) {
                count++;
            }
            maximum = Math.max(maximum, node.val);
            if (node.left != null) {
                pending.push(new Frame(node.left, maximum));
            }
            if (node.right != null) {
                pending.push(new Frame(node.right, maximum));
            }
        }
        return count;
    }
}
