class Solution {
    public long kthLargestLevelSum(TreeNode root, int k) {
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        List<Long> sums = new ArrayList<>();
        while (!queue.isEmpty()) {
            sums.add(nextLevel(queue));
        }
        if (sums.size() < k) {
            return -1;
        }
        sums.sort(Collections.reverseOrder());
        return sums.get(k - 1);
    }

    private long nextLevel(Deque<TreeNode> queue) {
        long total = 0;
        int levelSize = queue.size();
        for (int count = 0; count < levelSize; count++) {
            TreeNode node = queue.remove();
            total += node.val;
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        }
        return total;
    }
}
