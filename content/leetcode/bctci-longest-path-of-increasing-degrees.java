class Solution {
    public int longestIncreasingDegreePath(int V, int[][] edges) {
        int[] degree = new int[V];
        List<List<Integer>> neighbors = new ArrayList<>();
        for (int node = 0; node < V; node++) {
            neighbors.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            degree[edge[0]]++;
            degree[edge[1]]++;
            neighbors.get(edge[0]).add(edge[1]);
            neighbors.get(edge[1]).add(edge[0]);
        }
        Integer[] order = new Integer[V];
        for (int node = 0; node < V; node++) {
            order[node] = node;
        }
        Arrays.sort(order, Comparator.comparingInt(node -> degree[node]));
        int[] longest = new int[V];
        Arrays.fill(longest, 1);
        int best = 1;
        for (int node : order) {
            best = Math.max(best, longest[node]);
            for (int other : neighbors.get(node)) {
                if (degree[other] > degree[node]) {
                    longest[other] = Math.max(longest[other], longest[node] + 1);
                }
            }
        }
        return best;
    }
}
