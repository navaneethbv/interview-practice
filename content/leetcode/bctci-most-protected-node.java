class Solution {
    private final Map<TreeNode, Integer> heights = new HashMap<>();

    public int mostProtected(TreeNode root) {
        height(root);
        int best = 0;
        List<TreeNode> level = List.of(root);
        for (int depth = 0; !level.isEmpty(); depth++) {
            List<TreeNode> next = new ArrayList<>();
            for (int position = 0; position < level.size(); position++) {
                TreeNode node = level.get(position);
                int protection = Math.min(Math.min(depth, heights.get(node)), Math.min(position, level.size() - 1 - position));
                best = Math.max(best, protection);
                if (node.left != null) {
                    next.add(node.left);
                }
                if (node.right != null) {
                    next.add(node.right);
                }
            }
            level = next;
        }
        return best;
    }

    private int height(TreeNode node) {
        if (node == null) {
            return -1;
        }
        int h = 1 + Math.max(height(node.left), height(node.right));
        heights.put(node, h);
        return h;
    }
}
