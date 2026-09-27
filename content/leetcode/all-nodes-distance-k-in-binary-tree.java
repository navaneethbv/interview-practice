class Solution {
    public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
        Map<TreeNode, TreeNode> parents = new HashMap<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        parents.put(root, null);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            addChild(parents, stack, node, node.left);
            addChild(parents, stack, node, node.right);
        }
        Set<TreeNode> seen = new HashSet<>();
        seen.add(target);
        Deque<TreeNode> pending = new ArrayDeque<>();
        pending.add(target);
        for (int distance = 0; distance < k && !pending.isEmpty(); distance++) {
            int levelSize = pending.size();
            for (int count = 0; count < levelSize; count++) {
                addNeighbors(pending, seen, parents, pending.remove());
            }
        }
        List<Integer> values = new ArrayList<>();
        for (TreeNode node : pending) {
            values.add(node.val);
        }
        return values;
    }

    private void addChild(Map<TreeNode, TreeNode> parents, Deque<TreeNode> stack,
                          TreeNode parent, TreeNode child) {
        if (child != null) {
            parents.put(child, parent);
            stack.push(child);
        }
    }

    private void addNeighbors(Deque<TreeNode> pending, Set<TreeNode> seen,
                              Map<TreeNode, TreeNode> parents, TreeNode node) {
        addNeighbor(pending, seen, node.left);
        addNeighbor(pending, seen, node.right);
        addNeighbor(pending, seen, parents.get(node));
    }

    private void addNeighbor(Deque<TreeNode> pending, Set<TreeNode> seen, TreeNode neighbor) {
        if (neighbor != null && seen.add(neighbor)) {
            pending.add(neighbor);
        }
    }
}
