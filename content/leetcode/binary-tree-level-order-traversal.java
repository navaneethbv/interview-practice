class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.addLast(root);
        while (!queue.isEmpty()) {
            result.add(readLevel(queue));
        }
        return result;
    }

    private List<Integer> readLevel(Deque<TreeNode> queue) {
        int width = queue.size();
        List<Integer> values = new ArrayList<>();
        for (int index = 0; index < width; index++) {
            TreeNode node = queue.removeFirst();
            values.add(node.val);
            if (node.left != null) {
                queue.addLast(node.left);
            }
            if (node.right != null) {
                queue.addLast(node.right);
            }
        }
        return values;
    }
}
