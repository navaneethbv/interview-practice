class Solution {
    public TreeNode bstFromPreorder(int[] preorder) {
        TreeNode root = new TreeNode(preorder[0]);
        Deque<TreeNode> ancestors = new ArrayDeque<>();
        ancestors.push(root);
        for (int index = 1; index < preorder.length; index++) {
            TreeNode node = new TreeNode(preorder[index]);
            if (node.val < ancestors.peek().val) {
                ancestors.peek().left = node;
            } else {
                TreeNode parent = null;
                while (!ancestors.isEmpty() && ancestors.peek().val < node.val) {
                    parent = ancestors.pop();
                }
                parent.right = node;
            }
            ancestors.push(node);
        }
        return root;
    }
}
