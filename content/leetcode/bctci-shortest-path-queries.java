class Solution {
    public List<List<Integer>> shortestPaths(int[][] graph, int start, int[] queries) {
        int[] parent = new int[graph.length];
        Arrays.fill(parent, -2);
        parent[start] = -1;
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(start);
        while (!queue.isEmpty()) {
            int node = queue.poll();
            for (int neighbor : graph[node]) {
                if (parent[neighbor] == -2) {
                    parent[neighbor] = node;
                    queue.add(neighbor);
                }
            }
        }
        List<List<Integer>> answers = new ArrayList<>();
        for (int target : queries) {
            List<Integer> path = new ArrayList<>();
            if (parent[target] != -2) {
                for (int node = target; node != -1; node = parent[node]) {
                    path.add(node);
                }
                Collections.reverse(path);
            }
            answers.add(path);
        }
        return answers;
    }
}
