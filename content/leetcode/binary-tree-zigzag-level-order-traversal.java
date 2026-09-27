class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> levels = new ArrayList<>();
        if (root == null) {
            return levels;
        }
        Deque<TreeNode> pending = new ArrayDeque<>();
        pending.add(root);
        while (!pending.isEmpty()) {
            List<Integer> levelValues = new ArrayList<>();
            int levelSize = pending.size();
            for (int count = 0; count < levelSize; count++) {
                TreeNode node = pending.remove();
                levelValues.add(node.val);
                if (node.left != null) {
                    pending.add(node.left);
                }
                if (node.right != null) {
                    pending.add(node.right);
                }
            }
            if (levels.size() % 2 == 1) {
                Collections.reverse(levelValues);
            }
            levels.add(levelValues);
        }
        return levels;
    }
}
