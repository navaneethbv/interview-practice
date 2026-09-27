class Solution {
    public int closestValue(TreeNode root, double target) {
        int bestValue = root.val;
        TreeNode current = root;
        while (current != null) {
            double currentDistance = Math.abs(current.val - target);
            double bestDistance = Math.abs(bestValue - target);
            if (currentDistance < bestDistance
                    || currentDistance == bestDistance && current.val < bestValue) {
                bestValue = current.val;
            }
            current = target < current.val ? current.left : current.right;
        }
        return bestValue;
    }
}
