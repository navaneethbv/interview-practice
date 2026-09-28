class Solution {
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        LinkedList<List<Integer>> answer = new LinkedList<>();
        if (root == null) {
            return answer;
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            answer.addFirst(nextLevel(queue));
        }
        return answer;
    }

    private List<Integer> nextLevel(Deque<TreeNode> queue) {
        List<Integer> values = new ArrayList<>();
        for (int count = queue.size(); count > 0; count--) {
            TreeNode node = queue.remove();
            values.add(node.val);
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        }
        return values;
    }
}
