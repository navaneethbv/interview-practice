class Solution {
    public TreeNode constructFromPrePost(int[] preorder, int[] postorder) {
        TreeNode root = new TreeNode(preorder[0]);
        Deque<TreeNode> stack = new ArrayDeque<>(); stack.push(root);
        int index = 0;
        for (int i = 1; i < preorder.length; i++) {
            while (stack.peek().val == postorder[index]) { stack.pop(); index++; }
            TreeNode node = new TreeNode(preorder[i]);
            if (stack.peek().left == null) stack.peek().left = node;
            else stack.peek().right = node;
            stack.push(node);
        }
        return root;
    }
}
