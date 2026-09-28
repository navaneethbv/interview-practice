class Solution {
    public int meetingCost(int[][] graph, int node1, int node2, int node3) {
        int[] totals = new int[graph.length];
        for (int start : new int[] {node1, node2, node3}) {
            int[] distance = distances(graph, start);
            for (int node = 0; node < graph.length; node++) {
                totals[node] += distance[node];
            }
        }
        return Arrays.stream(totals).min().getAsInt();
    }

    private int[] distances(int[][] graph, int start) {
        int[] distance = new int[graph.length];
        Arrays.fill(distance, -1);
        distance[start] = 0;
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(start);
        while (!queue.isEmpty()) {
            int node = queue.poll();
            for (int neighbor : graph[node]) {
                if (distance[neighbor] == -1) {
                    distance[neighbor] = distance[node] + 1;
                    queue.add(neighbor);
                }
            }
        }
        return distance;
    }
}
