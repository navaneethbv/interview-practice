class Solution {
    private static class Visit {
        final TreeNode node;
        final int remainingSum;
        final boolean leaving;

        Visit(TreeNode node, int remainingSum, boolean leaving) {
            this.node = node;
            this.remainingSum = remainingSum;
            this.leaving = leaving;
        }
    }

    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> paths = new ArrayList<>();
        List<Integer> currentPath = new ArrayList<>();
        Deque<Visit> pending = new ArrayDeque<>();
        if (root != null) {
            pending.push(new Visit(root, targetSum, false));
        }
        while (!pending.isEmpty()) {
            Visit visit = pending.pop();
            if (visit.leaving) {
                currentPath.remove(currentPath.size() - 1);
                continue;
            }
            TreeNode node = visit.node;
            currentPath.add(node.val);
            int remainingSum = visit.remainingSum - node.val;
            if (node.left == null && node.right == null && remainingSum == 0) {
                paths.add(new ArrayList<>(currentPath));
            }
            pending.push(new Visit(node, remainingSum, true));
            if (node.right != null) {
                pending.push(new Visit(node.right, remainingSum, false));
            }
            if (node.left != null) {
                pending.push(new Visit(node.left, remainingSum, false));
            }
        }
        return paths;
    }
}
