class Solution {
    public TreeNode constructFromPrePost(int[] preorder, int[] postorder) {
        TreeNode root = new TreeNode(preorder[0]);
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        int postorderIndex = 0;
        for (int index = 1; index < preorder.length; index++) {
            while (stack.peek().val == postorder[postorderIndex]) {
                stack.pop();
                postorderIndex++;
            }
            TreeNode node = new TreeNode(preorder[index]);
            if (stack.peek().left == null) {
                stack.peek().left = node;
            } else {
                stack.peek().right = node;
            }
            stack.push(node);
        }
        return root;
    }
}
