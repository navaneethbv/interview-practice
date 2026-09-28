class Solution {
    private Set<Integer> deleted;
    private List<TreeNode> forest;
    public List<TreeNode> delNodes(TreeNode root, int[] toDelete) {
        deleted = new HashSet<>();
        for (int value : toDelete) {
            deleted.add(value);
        }
        forest = new ArrayList<>();
        visit(root, true);
        return forest;
    }
    private TreeNode visit(TreeNode node, boolean isRoot) {
        if (node == null) {
            return null;
        }
        boolean remove = deleted.contains(node.val);
        if (isRoot && !remove) {
            forest.add(node);
        }
        node.left = visit(node.left, remove);
        node.right = visit(node.right, remove);
        return remove ? null : node;
    }
}
