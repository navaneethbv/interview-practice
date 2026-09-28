class Solution {
    public int solve(int n, int[][] edges) {
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adjacency.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adjacency.get(edge[0]).add(edge[1]);
            adjacency.get(edge[1]).add(edge[0]);
        }
        int endpoint = 0;
        int answer = 0;
        for (int pass = 0; pass < 2; pass++) {
            int[] distances = new int[n];
            Arrays.fill(distances, -1);
            Deque<Integer> queue = new ArrayDeque<>();
            queue.add(endpoint);
            distances[endpoint] = 0;
            while (!queue.isEmpty()) {
                endpoint = queue.remove();
                for (int neighbor : adjacency.get(endpoint)) {
                    if (distances[neighbor] == -1) {
                        distances[neighbor] = distances[endpoint] + 1;
                        queue.add(neighbor);
                    }
                }
            }
            answer = distances[endpoint];
        }
        return answer;
    }
}
