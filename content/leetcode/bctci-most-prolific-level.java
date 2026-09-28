class Solution {
    public int mostProlificLevel(TreeNode root) {
        if (root == null) {
            return -1;
        }
        List<Integer> sizes = new ArrayList<>();
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            sizes.add(queue.size());
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
        sizes.add(0);
        int best = 0;
        for (int depth = 1; depth < sizes.size() - 1; depth++) {
            if ((long) sizes.get(depth + 1) * sizes.get(best) > (long) sizes.get(best + 1) * sizes.get(depth)) {
                best = depth;
            }
        }
        return best;
    }
}
