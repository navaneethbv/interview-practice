class Solution {
    private int[] parent;

    public double highestAverageGain(int V, int[][] edges) {
        parent = new int[V];
        for (int node = 0; node < V; node++) {
            parent[node] = node;
        }
        for (int[] edge : edges) {
            parent[find(edge[0])] = find(edge[1]);
        }
        long[] totals = new long[V];
        long[] counts = new long[V];
        for (int[] edge : edges) {
            int root = find(edge[0]);
            totals[root] += edge[2];
            counts[root]++;
        }
        double best = 0;
        for (int root = 0; root < V; root++) {
            if (counts[root] > 0) {
                best = Math.max(best, (double) totals[root] / counts[root]);
            }
        }
        return best;
    }

    private int find(int node) {
        while (parent[node] != node) {
            parent[node] = parent[parent[node]];
            node = parent[node];
        }
        return node;
    }
}
