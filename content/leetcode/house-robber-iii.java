class Solution {
    public int rob(TreeNode root) {
        if (root == null) {
            return 0;
        }
        Map<TreeNode, int[]> states = new HashMap<>();
        states.put(null, new int[]{0, 0});
        Deque<TreeNode> stack = new ArrayDeque<>();
        Deque<Boolean> expanded = new ArrayDeque<>();
        stack.push(root);
        expanded.push(false);

        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            boolean isExpanded = expanded.pop();
            if (!isExpanded) {
                stack.push(node);
                expanded.push(true);
                if (node.right != null) {
                    stack.push(node.right);
                    expanded.push(false);
                }
                if (node.left != null) {
                    stack.push(node.left);
                    expanded.push(false);
                }
                continue;
            }

            int[] left = states.get(node.left);
            int[] right = states.get(node.right);
            int robCurrent = node.val + left[1] + right[1];
            int skipCurrent = Math.max(left[0], left[1])
                    + Math.max(right[0], right[1]);
            states.put(node, new int[]{robCurrent, skipCurrent});
        }

        int[] result = states.get(root);
        return Math.max(result[0], result[1]);
    }
}
