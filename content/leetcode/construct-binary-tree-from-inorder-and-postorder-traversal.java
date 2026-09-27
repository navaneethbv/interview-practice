class Solution {
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        TreeNode root = new TreeNode(postorder[postorder.length - 1]);
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        int inorderIndex = inorder.length - 1;
        for (int postorderIndex = postorder.length - 2; postorderIndex >= 0; postorderIndex--) {
            TreeNode node = new TreeNode(postorder[postorderIndex]);
            if (stack.peek().val != inorder[inorderIndex]) {
                stack.peek().right = node;
            } else {
                TreeNode parent = null;
                while (!stack.isEmpty() && stack.peek().val == inorder[inorderIndex]) {
                    parent = stack.pop();
                    inorderIndex--;
                }
                parent.left = node;
            }
            stack.push(node);
        }
        return root;
    }
}
