class Solution {
    public boolean isStronglyConnected(int[][] graph) {
        List<List<Integer>> forward = new ArrayList<>();
        List<List<Integer>> reverse = new ArrayList<>();
        for (int node = 0; node < graph.length; node++) {
            forward.add(new ArrayList<>());
            reverse.add(new ArrayList<>());
        }
        for (int node = 0; node < graph.length; node++) {
            for (int neighbor : graph[node]) {
                forward.get(node).add(neighbor);
                reverse.get(neighbor).add(node);
            }
        }
        return reachesAll(forward) && reachesAll(reverse);
    }

    private boolean reachesAll(List<List<Integer>> graph) {
        boolean[] seen = new boolean[graph.size()];
        seen[0] = true;
        int reached = 1;
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        while (!stack.isEmpty()) {
            for (int neighbor : graph.get(stack.pop())) {
                if (!seen[neighbor]) {
                    seen[neighbor] = true;
                    reached++;
                    stack.push(neighbor);
                }
            }
        }
        return reached == graph.size();
    }
}
