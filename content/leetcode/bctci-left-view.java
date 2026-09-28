class Solution {
    public List<Integer> leftView(TreeNode root) {
        List<Integer> view = new ArrayList<>();
        Deque<TreeNode> queue = new ArrayDeque<>();
        if (root != null) {
            queue.add(root);
        }
        while (!queue.isEmpty()) {
            view.add(queue.peek().val);
            for (int count = queue.size(); count > 0; count--) {
                TreeNode node = queue.poll();
                if (node.left != null) {
                    queue.add(node.left);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
            }
        }
        return view;
    }
}
