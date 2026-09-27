class Solution {
    private List<int[]>[] graph;
    private int[] values;
    private int maxTime;
    private int[] shortestTime;
    private int[] visits;
    private int bestQuality;

    public int maximalPathQuality(int[] values, int[][] edges, int maxTime) {
        this.values = values;
        this.maxTime = maxTime;
        graph = buildGraph(values.length, edges);
        shortestTime = shortestTimesFromZero();
        visits = new int[values.length];
        visits[0] = 1;
        bestQuality = values[0];
        search(0, 0, values[0]);
        return bestQuality;
    }

    private List<int[]>[] buildGraph(int nodeCount, int[][] edges) {
        List<int[]>[] result = new ArrayList[nodeCount];
        for (int node = 0; node < nodeCount; node++) {
            result[node] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            result[edge[0]].add(new int[] {edge[1], edge[2]});
            result[edge[1]].add(new int[] {edge[0], edge[2]});
        }
        return result;
    }

    private int[] shortestTimesFromZero() {
        int[] distances = new int[values.length];
        Arrays.fill(distances, Integer.MAX_VALUE);
        distances[0] = 0;
        PriorityQueue<int[]> queue = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        queue.offer(new int[] {0, 0});
        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int time = current[0];
            int node = current[1];
            if (time != distances[node]) {
                continue;
            }
            for (int[] edge : graph[node]) {
                int nextNode = edge[0];
                int nextTime = time + edge[1];
                if (nextTime < distances[nextNode]) {
                    distances[nextNode] = nextTime;
                    queue.offer(new int[] {nextTime, nextNode});
                }
            }
        }
        return distances;
    }

    private void search(int node, int time, int quality) {
        if (node == 0) {
            bestQuality = Math.max(bestQuality, quality);
        }
        for (int[] edge : graph[node]) {
            int nextNode = edge[0];
            int nextTime = time + edge[1];
            if (nextTime + shortestTime[nextNode] > maxTime) {
                continue;
            }
            int addedValue = visits[nextNode] == 0 ? values[nextNode] : 0;
            visits[nextNode]++;
            search(nextNode, nextTime, quality + addedValue);
            visits[nextNode]--;
        }
    }
}
