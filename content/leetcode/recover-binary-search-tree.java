class Solution {
    public void recoverTree(TreeNode root) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode previous = null;
        TreeNode firstWrong = null;
        TreeNode secondWrong = null;
        TreeNode current = root;

        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            if (previous != null && previous.val > current.val) {
                if (firstWrong == null) {
                    firstWrong = previous;
                }
                secondWrong = current;
            }
            previous = current;
            current = current.right;
        }

        if (firstWrong != null && secondWrong != null) {
            int temporary = firstWrong.val;
            firstWrong.val = secondWrong.val;
            secondWrong.val = temporary;
        }
    }
}
