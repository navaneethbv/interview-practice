class Solution {
    public boolean isTree(int[][] graph) {
        int degreeSum = 0;
        for (int[] neighbors : graph) {
            degreeSum += neighbors.length;
        }
        if (degreeSum / 2 != graph.length - 1) {
            return false;
        }
        boolean[] seen = new boolean[graph.length];
        seen[0] = true;
        int reached = 1;
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        while (!stack.isEmpty()) {
            for (int neighbor : graph[stack.pop()]) {
                if (!seen[neighbor]) {
                    seen[neighbor] = true;
                    reached++;
                    stack.push(neighbor);
                }
            }
        }
        return reached == graph.length;
    }
}
