class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        TreeNode root = new TreeNode(preorder[0]);
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        int inorderIndex = 0;
        for (int index = 1; index < preorder.length; index++) {
            TreeNode node = new TreeNode(preorder[index]);
            if (stack.peek().val != inorder[inorderIndex]) {
                stack.peek().left = node;
            } else {
                TreeNode parent = stack.peek();
                while (!stack.isEmpty() && stack.peek().val == inorder[inorderIndex]) {
                    parent = stack.pop();
                    inorderIndex++;
                }
                parent.right = node;
            }
            stack.push(node);
        }
        return root;
    }
}
