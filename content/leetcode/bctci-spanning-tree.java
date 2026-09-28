class Solution {
    public List<List<Integer>> spanningTree(int[][] graph) {
        boolean[] seen = new boolean[graph.length];
        seen[0] = true;
        List<List<Integer>> edges = new ArrayList<>();
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(0);
        while (!queue.isEmpty()) {
            int node = queue.poll();
            for (int neighbor : graph[node]) {
                if (!seen[neighbor]) {
                    seen[neighbor] = true;
                    edges.add(List.of(node, neighbor));
                    queue.add(neighbor);
                }
            }
        }
        return edges;
    }
}
