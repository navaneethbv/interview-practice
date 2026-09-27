class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        Deque<TreeNode[]> stack = new ArrayDeque<>();
        stack.push(new TreeNode[] {p, q});
        while (!stack.isEmpty()) {
            TreeNode[] pair = stack.pop();
            TreeNode first = pair[0];
            TreeNode second = pair[1];
            if (first == null || second == null) {
                if (first != second) {
                    return false;
                }
                continue;
            }
            if (first.val != second.val) {
                return false;
            }
            stack.push(new TreeNode[] {first.left, second.left});
            stack.push(new TreeNode[] {first.right, second.right});
        }
        return true;
    }
}
