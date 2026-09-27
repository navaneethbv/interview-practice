class Solution {
    public int sumNumbers(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int total = 0;
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<Integer> pathNumbers = new ArrayDeque<>();
        nodes.push(root);
        pathNumbers.push(0);
        while (!nodes.isEmpty()) {
            TreeNode node = nodes.pop();
            int previousNumber = pathNumbers.pop();
            int currentNumber = previousNumber * 10 + node.val;
            if (node.left == null && node.right == null) {
                total += currentNumber;
                continue;
            }
            if (node.right != null) {
                nodes.push(node.right);
                pathNumbers.push(currentNumber);
            }
            if (node.left != null) {
                nodes.push(node.left);
                pathNumbers.push(currentNumber);
            }
        }
        return total;
    }
}
