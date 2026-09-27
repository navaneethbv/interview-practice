class Solution {
    private record Frame(TreeNode node, long lower, long upper) {}

    public boolean isValidBST(TreeNode root) {
        Deque<Frame> stack = new ArrayDeque<>();
        stack.push(new Frame(root, Long.MIN_VALUE, Long.MAX_VALUE));
        while (!stack.isEmpty()) {
            Frame frame = stack.pop();
            TreeNode node = frame.node();
            if (node == null) {
                continue;
            }
            if (node.val <= frame.lower() || node.val >= frame.upper()) {
                return false;
            }
            stack.push(new Frame(node.left, frame.lower(), node.val));
            stack.push(new Frame(node.right, node.val, frame.upper()));
        }
        return true;
    }
}
