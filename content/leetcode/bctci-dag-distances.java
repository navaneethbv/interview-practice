class Solution {
    private static final int SENTINEL = 2147483647;

    public int[] dagDistances(int V, int[][] edges, int start) {
        List<List<int[]>> adjacency = adjacency(V, edges);
        int[] best = new int[V];
        Arrays.fill(best, SENTINEL);
        best[start] = 0;
        for (int node : order(V, adjacency)) {
            if (best[node] == SENTINEL) {
                continue;
            }
            for (int[] edge : adjacency.get(node)) {
                int candidate = best[node] + edge[1];
                if (best[edge[0]] == SENTINEL || candidate < best[edge[0]]) {
                    best[edge[0]] = candidate;
                }
            }
        }
        return best;
    }

    private List<Integer> order(int V, List<List<int[]>> adjacency) {
        int[] indegree = new int[V];
        for (List<int[]> neighbors : adjacency) {
            for (int[] edge : neighbors) {
                indegree[edge[0]]++;
            }
        }
        Deque<Integer> queue = new ArrayDeque<>();
        for (int node = 0; node < V; node++) {
            if (indegree[node] == 0) {
                queue.add(node);
            }
        }
        List<Integer> order = new ArrayList<>();
        while (!queue.isEmpty()) {
            int node = queue.poll();
            order.add(node);
            for (int[] edge : adjacency.get(node)) {
                if (--indegree[edge[0]] == 0) {
                    queue.add(edge[0]);
                }
            }
        }
        return order;
    }

    private List<List<int[]>> adjacency(int V, int[][] edges) {
        List<List<int[]>> adjacency = new ArrayList<>();
        for (int node = 0; node < V; node++) {
            adjacency.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adjacency.get(edge[0]).add(new int[] {edge[1], edge[2]});
        }
        return adjacency;
    }
}
