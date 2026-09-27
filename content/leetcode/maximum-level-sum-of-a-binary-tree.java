class Solution {
public int maxLevelSum(TreeNode root) {
    Deque<TreeNode> queue = new ArrayDeque<>();
    queue.add(root);
    long bestSum = Long.MIN_VALUE;
    int depth = 0;
    int answer = 1;
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        long levelSum = 0;
        depth++;
        for (int index = 0; index < levelSize; index++) {
            TreeNode node = queue.remove();
            levelSum += node.val;
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        }
        if (levelSum > bestSum) {
            bestSum = levelSum;
            answer = depth;
        }
    }
    return answer;
}
}
