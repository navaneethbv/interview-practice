class Solution {
    private static final int MOD = 1_000_000_007;

    public int[] countPaths(int[][] graph, int start) {
        int n = graph.length;
        int[] indegree = new int[n];
        for (int[] neighbors : graph) {
            for (int v : neighbors) {
                indegree[v]++;
            }
        }
        Deque<Integer> queue = new ArrayDeque<>();
        for (int node = 0; node < n; node++) {
            if (indegree[node] == 0) {
                queue.add(node);
            }
        }
        long[] paths = new long[n];
        paths[start] = 1;
        while (!queue.isEmpty()) {
            int node = queue.poll();
            for (int v : graph[node]) {
                paths[v] = (paths[v] + paths[node]) % MOD;
                if (--indegree[v] == 0) {
                    queue.add(v);
                }
            }
        }
        int[] result = new int[n];
        for (int node = 0; node < n; node++) {
            result[node] = (int) paths[node];
        }
        return result;
    }
}
