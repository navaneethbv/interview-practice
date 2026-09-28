class Solution {
    public TreeNode getTargetCopy(TreeNode original, TreeNode cloned, TreeNode target) {
        Deque<TreeNode[]> stack = new ArrayDeque<>();
        stack.push(new TreeNode[]{original, cloned});
        while (!stack.isEmpty()) {
            TreeNode[] pair = stack.pop();
            TreeNode source = pair[0];
            TreeNode copy = pair[1];
            if (source == target) {
                return copy;
            }
            if (source.left != null) {
                stack.push(new TreeNode[]{source.left, copy.left});
            }
            if (source.right != null) {
                stack.push(new TreeNode[]{source.right, copy.right});
            }
        }
        return null;
    }
}
