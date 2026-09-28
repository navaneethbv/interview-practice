class Solution {
    public TreeNode recoverFromPreorder(String traversal) {
        List<TreeNode> stack = new ArrayList<>();
        int index = 0;
        while (index < traversal.length()) {
            int depth = 0;
            while (index < traversal.length() && traversal.charAt(index) == '-') {
                depth++;
                index++;
            }
            int value = 0;
            while (index < traversal.length() && Character.isDigit(traversal.charAt(index))) {
                value = value * 10 + traversal.charAt(index) - '0';
                index++;
            }
            TreeNode node = new TreeNode(value);
            while (stack.size() > depth) {
                stack.remove(stack.size() - 1);
            }
            if (!stack.isEmpty()) {
                TreeNode parent = stack.get(stack.size() - 1);
                if (parent.left == null) {
                    parent.left = node;
                } else {
                    parent.right = node;
                }
            }
            stack.add(node);
        }
        return stack.get(0);
    }
}
