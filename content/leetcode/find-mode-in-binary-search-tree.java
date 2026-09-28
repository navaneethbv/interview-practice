class Solution {
    public int[] findMode(TreeNode root) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        Integer previous = null;
        int runLength = 0;
        int bestLength = 0;
        List<Integer> modes = new ArrayList<>();
        while (root != null || !stack.isEmpty()) {
            while (root != null) {
                stack.push(root);
                root = root.left;
            }
            root = stack.pop();
            if (previous != null && root.val == previous) {
                runLength++;
            } else {
                runLength = 1;
            }
            previous = root.val;
            if (runLength > bestLength) {
                bestLength = runLength;
                modes.clear();
                modes.add(root.val);
            } else if (runLength == bestLength) {
                modes.add(root.val);
            }
            root = root.right;
        }
        int[] result = new int[modes.size()];
        for (int index = 0; index < modes.size(); index++) {
            result[index] = modes.get(index);
        }
        return result;
    }
}
