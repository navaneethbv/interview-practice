class Solution {
    public int getMinimumDifference(TreeNode root) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        Integer previousValue = null;
        int answer = Integer.MAX_VALUE;
        TreeNode node = root;
        while (node != null || !stack.isEmpty()) {
            pushLeft(node, stack);
            node = stack.pop();
            if (previousValue != null) {
                answer = Math.min(answer, node.val - previousValue);
            }
            previousValue = node.val;
            node = node.right;
        }
        return answer;
    }

    private void pushLeft(TreeNode node, Deque<TreeNode> stack) {
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
    }
}
