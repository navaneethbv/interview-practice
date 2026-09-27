class Solution {
    public List<Integer> largestValues(TreeNode root) {
        List<Integer> largestByLevel = new ArrayList<>();
        if (root == null) {
            return largestByLevel;
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            int largest = Integer.MIN_VALUE;
            for (int index = 0; index < levelSize; index++) {
                TreeNode node = queue.remove();
                largest = Math.max(largest, node.val);
                addChildren(queue, node);
            }
            largestByLevel.add(largest);
        }
        return largestByLevel;
    }

    private void addChildren(Deque<TreeNode> queue, TreeNode node) {
        if (node.left != null) {
            queue.add(node.left);
        }
        if (node.right != null) {
            queue.add(node.right);
        }
    }
}
