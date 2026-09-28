class Solution {
    public boolean hasRoute(int n, int[][] edges, int start, int end) {
        List<List<Integer>> neighbors = new ArrayList<>();
        for (int node = 0; node < n; node++) {
            neighbors.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            neighbors.get(edge[0]).add(edge[1]);
        }
        boolean[] visited = new boolean[n];
        visited[start] = true;
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(start);
        while (!queue.isEmpty()) {
            int node = queue.poll();
            if (node == end) {
                return true;
            }
            for (int next : neighbors.get(node)) {
                if (!visited[next]) {
                    visited[next] = true;
                    queue.add(next);
                }
            }
        }
        return false;
    }
}
