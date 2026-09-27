class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        Map<TreeNode, TreeNode> parents = new HashMap<>();
        parents.put(root, null);
        Deque<TreeNode> pending = new ArrayDeque<>();
        pending.push(root);
        while (!parents.containsKey(p) || !parents.containsKey(q)) {
            TreeNode node = pending.pop();
            addChild(parents, pending, node, node.left);
            addChild(parents, pending, node, node.right);
        }
        Set<TreeNode> ancestors = new HashSet<>();
        while (p != null) {
            ancestors.add(p);
            p = parents.get(p);
        }
        while (!ancestors.contains(q)) {
            q = parents.get(q);
        }
        return q;
    }

    private void addChild(Map<TreeNode, TreeNode> parents, Deque<TreeNode> pending,
                          TreeNode parent, TreeNode child) {
        if (child != null) {
            parents.put(child, parent);
            pending.push(child);
        }
    }
}
