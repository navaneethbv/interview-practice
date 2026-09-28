class Solution {
    public boolean isValidUndirected(int[][] graph) {
        int n = graph.length;
        Set<Long> edges = new HashSet<>();
        for (int node = 0; node < n; node++) {
            for (int neighbor : graph[node]) {
                if (neighbor < 0 || neighbor >= n || neighbor == node || !edges.add((long) node * n + neighbor)) {
                    return false;
                }
            }
        }
        for (long edge : edges) {
            long a = edge / n;
            long b = edge % n;
            if (!edges.contains(b * n + a)) {
                return false;
            }
        }
        return true;
    }
}
