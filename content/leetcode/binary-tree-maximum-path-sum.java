class Solution {
    private record Frame(TreeNode node, boolean expanded) {}

    public int maxPathSum(TreeNode root) {
        int best = Integer.MIN_VALUE;
        Map<TreeNode, Integer> gain = new IdentityHashMap<>();
        Deque<Frame> stack = new ArrayDeque<>();
        stack.push(new Frame(root, false));
        while (!stack.isEmpty()) {
            Frame frame = stack.pop();
            TreeNode node = frame.node();
            if (node == null) {
                continue;
            }
            if (!frame.expanded()) {
                stack.push(new Frame(node, true));
                stack.push(new Frame(node.right, false));
                stack.push(new Frame(node.left, false));
                continue;
            }
            int left = Math.max(0, gain.getOrDefault(node.left, 0));
            int right = Math.max(0, gain.getOrDefault(node.right, 0));
            best = Math.max(best, node.val + left + right);
            gain.put(node, node.val + Math.max(left, right));
        }
        return best;
    }
}
