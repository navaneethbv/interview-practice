class Solution {
    public int amountOfTime(TreeNode root, int start) {
        Map<Integer, List<Integer>> graph = buildGraph(root);
        Set<Integer> seen = new HashSet<>();
        Deque<int[]> queue = new ArrayDeque<>();
        queue.add(new int[]{start, 0});
        seen.add(start);
        int minutes = 0;
        while (!queue.isEmpty()) {
            int[] state = queue.remove();
            minutes = Math.max(minutes, state[1]);
            for (int neighbor : graph.get(state[0])) {
                if (seen.add(neighbor)) {
                    queue.add(new int[]{neighbor, state[1] + 1});
                }
            }
        }
        return minutes;
    }

    private Map<Integer, List<Integer>> buildGraph(TreeNode root) {
        Map<Integer, List<Integer>> graph = new HashMap<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            graph.computeIfAbsent(node.val, value -> new ArrayList<>());
            addChild(graph, stack, node.val, node.left);
            addChild(graph, stack, node.val, node.right);
        }
        return graph;
    }

    private void addChild(Map<Integer, List<Integer>> graph, Deque<TreeNode> stack,
            int parent, TreeNode child) {
        if (child == null) {
            return;
        }
        graph.get(parent).add(child.val);
        graph.computeIfAbsent(child.val, value -> new ArrayList<>()).add(parent);
        stack.push(child);
    }
}
