class Solution {
    public List<Integer> dagPath(int V, int[][] edges, int start, int goal) {
        List<List<int[]>> adjacency = adjacency(V, edges);
        long[] distance = new long[V];
        int[] previous = new int[V];
        Arrays.fill(distance, Long.MAX_VALUE);
        distance[start] = 0;
        for (int node : order(V, adjacency)) {
            if (distance[node] == Long.MAX_VALUE) {
                continue;
            }
            for (int[] edge : adjacency.get(node)) {
                if (distance[node] + edge[1] < distance[edge[0]]) {
                    distance[edge[0]] = distance[node] + edge[1];
                    previous[edge[0]] = node;
                }
            }
        }
        List<Integer> path = new ArrayList<>();
        if (distance[goal] == Long.MAX_VALUE) {
            return path;
        }
        for (int node = goal; node != start; node = previous[node]) {
            path.add(node);
        }
        path.add(start);
        Collections.reverse(path);
        return path;
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
