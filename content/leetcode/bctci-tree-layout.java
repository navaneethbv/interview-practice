class Solution {
    public int maxStacked(TreeNode root) {
        Map<Long, Integer> counts = new HashMap<>();
        Deque<Object[]> stack = new ArrayDeque<>();
        stack.push(new Object[] {root, 0, 0});
        int best = 0;
        while (!stack.isEmpty()) {
            Object[] item = stack.pop();
            TreeNode node = (TreeNode) item[0];
            int row = (int) item[1];
            int col = (int) item[2];
            best = Math.max(best, counts.merge(((long) row << 20) | col, 1, Integer::sum));
            if (node.left != null) {
                stack.push(new Object[] {node.left, row + 1, col});
            }
            if (node.right != null) {
                stack.push(new Object[] {node.right, row, col + 1});
            }
        }
        return best;
    }
}
