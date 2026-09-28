class Solution {
    public List<Integer> findPath(int[][] graph, int node1, int node2) {
        int[] parent = new int[graph.length];
        Arrays.fill(parent, -2);
        parent[node1] = -1;
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(node1);
        while (!queue.isEmpty() && parent[node2] == -2) {
            int node = queue.poll();
            for (int neighbor : graph[node]) {
                if (parent[neighbor] == -2) {
                    parent[neighbor] = node;
                    queue.add(neighbor);
                }
            }
        }
        List<Integer> path = new ArrayList<>();
        if (parent[node2] == -2) {
            return path;
        }
        for (int node = node2; node != -1; node = parent[node]) {
            path.add(node);
        }
        Collections.reverse(path);
        return path;
    }
}
