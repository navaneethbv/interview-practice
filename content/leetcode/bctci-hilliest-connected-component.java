class Solution {
    public double hilliness(int[][] graph, double[] heights) {
        boolean[] seen = new boolean[graph.length];
        double best = 0;
        for (int start = 0; start < graph.length; start++) {
            if (seen[start]) {
                continue;
            }
            seen[start] = true;
            Deque<Integer> stack = new ArrayDeque<>();
            stack.push(start);
            double gain = 0;
            long endpoints = 0;
            while (!stack.isEmpty()) {
                int node = stack.pop();
                for (int neighbor : graph[node]) {
                    gain += Math.abs(heights[node] - heights[neighbor]);
                    endpoints++;
                    if (!seen[neighbor]) {
                        seen[neighbor] = true;
                        stack.push(neighbor);
                    }
                }
            }
            if (endpoints > 0) {
                best = Math.max(best, gain / endpoints);
            }
        }
        return best;
    }
}
