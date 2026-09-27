class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        List<List<int[]>> graph = buildGraph(times, n);
        int[] distances = new int[n + 1];
        Arrays.fill(distances, Integer.MAX_VALUE);
        distances[k] = 0;

        PriorityQueue<int[]> queue =
                new PriorityQueue<>(Comparator.comparingInt(entry -> entry[0]));
        queue.add(new int[]{0, k});

        while (!queue.isEmpty()) {
            int[] current = queue.remove();
            int distance = current[0];
            int node = current[1];
            if (distance != distances[node]) {
                continue;
            }

            for (int[] edge : graph.get(node)) {
                int neighbor = edge[0];
                int newDistance = distance + edge[1];
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    queue.add(new int[]{newDistance, neighbor});
                }
            }
        }

        int longestDistance = 0;
        for (int node = 1; node <= n; node++) {
            if (distances[node] == Integer.MAX_VALUE) {
                return -1;
            }
            longestDistance = Math.max(longestDistance, distances[node]);
        }
        return longestDistance;
    }

    private List<List<int[]>> buildGraph(int[][] times, int n) {
        List<List<int[]>> graph = new ArrayList<>();
        for (int node = 0; node <= n; node++) {
            graph.add(new ArrayList<>());
        }
        for (int[] time : times) {
            graph.get(time[0]).add(new int[]{time[1], time[2]});
        }
        return graph;
    }
}
