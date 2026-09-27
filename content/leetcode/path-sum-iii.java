class Solution {
    private static class PathFrame {
        private final TreeNode node;
        private final long prefixSum;
        private final boolean leaving;

        private PathFrame(TreeNode node, long prefixSum, boolean leaving) {
            this.node = node;
            this.prefixSum = prefixSum;
            this.leaving = leaving;
        }
    }

    public int pathSum(TreeNode root, int targetSum) {
        Map<Long, Integer> prefixCounts = new HashMap<>();
        prefixCounts.put(0L, 1);
        Deque<PathFrame> stack = new ArrayDeque<>();
        if (root != null) {
            stack.push(new PathFrame(root, 0L, false));
        }
        int answer = 0;
        while (!stack.isEmpty()) {
            PathFrame frame = stack.pop();
            if (frame.leaving) {
                prefixCounts.put(frame.prefixSum, prefixCounts.get(frame.prefixSum) - 1);
                continue;
            }
            long prefixSum = frame.prefixSum + frame.node.val;
            answer += prefixCounts.getOrDefault(prefixSum - targetSum, 0);
            prefixCounts.put(prefixSum, prefixCounts.getOrDefault(prefixSum, 0) + 1);
            stack.push(new PathFrame(frame.node, prefixSum, true));
            if (frame.node.right != null) {
                stack.push(new PathFrame(frame.node.right, prefixSum, false));
            }
            if (frame.node.left != null) {
                stack.push(new PathFrame(frame.node.left, prefixSum, false));
            }
        }
        return answer;
    }
}
