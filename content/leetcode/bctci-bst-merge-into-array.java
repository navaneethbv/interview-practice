class Solution {
    public List<Integer> mergeBsts(TreeNode root1, TreeNode root2) {
        List<Integer> first = inorder(root1);
        List<Integer> second = inorder(root2);
        List<Integer> merged = new ArrayList<>();
        int i = 0;
        int j = 0;
        while (i < first.size() || j < second.size()) {
            if (j == second.size() || (i < first.size() && first.get(i) <= second.get(j))) {
                merged.add(first.get(i++));
            } else {
                merged.add(second.get(j++));
            }
        }
        return merged;
    }

    private List<Integer> inorder(TreeNode root) {
        List<Integer> values = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode node = root;
        while (!stack.isEmpty() || node != null) {
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
            node = stack.pop();
            values.add(node.val);
            node = node.right;
        }
        return values;
    }
}
