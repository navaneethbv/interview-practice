class Solution {
    public List<String> binaryTreePaths(TreeNode root) {
        List<String> paths = new ArrayList<>();
        if (root != null) {
            collectPaths(root, String.valueOf(root.val), paths);
        }
        return paths;
    }

    private void collectPaths(TreeNode node, String path, List<String> paths) {
        if (node.left == null && node.right == null) {
            paths.add(path);
            return;
        }
        if (node.left != null) {
            collectPaths(node.left, path + "->" + node.left.val, paths);
        }
        if (node.right != null) {
            collectPaths(node.right, path + "->" + node.right.val, paths);
        }
    }
}
