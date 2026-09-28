class Solution {
    public int maximumDetonation(int[][] bombs) {
        boolean[][] graph = buildGraph(bombs);
        int answer = 0;
        for (int start = 0; start < bombs.length; start++) {
            answer = Math.max(answer, reachable(graph, start));
        }
        return answer;
    }
    private boolean[][] buildGraph(int[][] bombs) {
        boolean[][] graph = new boolean[bombs.length][bombs.length];
        for (int first = 0; first < bombs.length; first++) {
            for (int second = 0; second < bombs.length; second++) {
                long dx = (long) bombs[first][0] - bombs[second][0];
                long dy = (long) bombs[first][1] - bombs[second][1];
                long radius = bombs[first][2];
                graph[first][second] = dx * dx + dy * dy <= radius * radius;
            }
        }
        return graph;
    }
    private int reachable(boolean[][] graph, int start) {
        boolean[] seen = new boolean[graph.length];
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        queue.add(start);
        seen[start] = true;
        int count = 0;
        while (!queue.isEmpty()) {
            int node = queue.remove();
            count++;
            for (int neighbor = 0; neighbor < graph.length; neighbor++) {
                if (graph[node][neighbor] && !seen[neighbor]) {
                    seen[neighbor] = true;
                    queue.add(neighbor);
                }
            }
        }
        return count;
    }
}
