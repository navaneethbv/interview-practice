class Solution {
    public int minCost(int n, int[][] edges) {
        List<List<int[]>> graph = new ArrayList<>();
        for (int node = 0; node < n; node++) {
            graph.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            graph.get(edge[0]).add(new int[]{edge[1], edge[2]});
            graph.get(edge[1]).add(new int[]{edge[0], 2 * edge[2]});
        }

        int[] distance = new int[n];
        Arrays.fill(distance, Integer.MAX_VALUE);
        distance[0] = 0;
        PriorityQueue<int[]> pending = new PriorityQueue<>(Comparator.comparingInt(pair -> pair[0]));
        pending.add(new int[]{0, 0});
        while (!pending.isEmpty()) {
            int[] state = pending.remove();
            int currentCost = state[0];
            int node = state[1];
            if (currentCost != distance[node]) {
                continue;
            }
            if (node == n - 1) {
                return currentCost;
            }
            for (int[] edge : graph.get(node)) {
                int nextCost = currentCost + edge[1];
                if (nextCost < distance[edge[0]]) {
                    distance[edge[0]] = nextCost;
                    pending.add(new int[]{nextCost, edge[0]});
                }
            }
        }
        return -1;
    }
}
