class Solution {
    public boolean hasDuplicates(TreeNode root) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode node = root;
        Integer previous = null;
        while (!stack.isEmpty() || node != null) {
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
            node = stack.pop();
            if (previous != null && previous == node.val) {
                return true;
            }
            previous = node.val;
            node = node.right;
        }
        return false;
    }
}
