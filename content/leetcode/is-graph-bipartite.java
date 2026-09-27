class Solution {
    public boolean isBipartite(int[][] graph) {
        int[] colors = new int[graph.length];
        for (int start = 0; start < graph.length; start++) {
            if (colors[start] != 0) {
                continue;
            }
            if (!colorComponent(graph, start, colors)) {
                return false;
            }
        }
        return true;
    }

    private boolean colorComponent(int[][] graph, int start, int[] colors) {
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(start);
        colors[start] = 1;
        while (!stack.isEmpty()) {
            int node = stack.pop();
            for (int neighbor : graph[node]) {
                if (colors[neighbor] == 0) {
                    colors[neighbor] = -colors[node];
                    stack.push(neighbor);
                } else if (colors[neighbor] == colors[node]) {
                    return false;
                }
            }
        }
        return true;
    }
}
