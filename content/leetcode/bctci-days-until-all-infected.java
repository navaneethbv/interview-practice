class Solution {
    public int daysToInfectAll(int[][] graph, int[] infected) {
        int[] day = new int[graph.length];
        Arrays.fill(day, -1);
        Deque<Integer> queue = new ArrayDeque<>();
        for (int node : infected) {
            day[node] = 0;
            queue.add(node);
        }
        int last = 0;
        while (!queue.isEmpty()) {
            int node = queue.poll();
            last = Math.max(last, day[node]);
            for (int neighbor : graph[node]) {
                if (day[neighbor] == -1) {
                    day[neighbor] = day[node] + 1;
                    queue.add(neighbor);
                }
            }
        }
        return last;
    }
}
