class Codec {
    public String serialize(TreeNode root) {
        if (root == null) {
            return "#";
        }
        StringBuilder result = new StringBuilder();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.remove();
            if (node == null) {
                result.append("#,");
            } else {
                result.append(node.val).append(',');
                queue.add(node.left);
                queue.add(node.right);
            }
        }
        return result.toString();
    }
    public TreeNode deserialize(String data) {
        String[] values = data.split(",");
        if (values[0].equals("#")) {
            return null;
        }
        TreeNode root = new TreeNode(Integer.parseInt(values[0]));
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        int position = 1;
        while (!queue.isEmpty()) {
            TreeNode node = queue.remove();
            if (!values[position].equals("#")) {
                node.left = new TreeNode(Integer.parseInt(values[position]));
                queue.add(node.left);
            }
            position++;
            if (!values[position].equals("#")) {
                node.right = new TreeNode(Integer.parseInt(values[position]));
                queue.add(node.right);
            }
            position++;
        }
        return root;
    }
}
