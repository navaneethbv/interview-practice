class Solution {
    public int findCircleNum(int[][] isConnected) {
        int cityCount = isConnected.length;
        boolean[] seen = new boolean[cityCount];
        int provinces = 0;

        for (int city = 0; city < cityCount; city++) {
            if (seen[city]) {
                continue;
            }
            provinces++;
            exploreComponent(city, isConnected, seen);
        }
        return provinces;
    }

    private void exploreComponent(int start, int[][] connections, boolean[] seen) {
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(start);
        seen[start] = true;
        while (!stack.isEmpty()) {
            int current = stack.pop();
            for (int neighbor = 0; neighbor < connections.length; neighbor++) {
                if (connections[current][neighbor] == 1 && !seen[neighbor]) {
                    seen[neighbor] = true;
                    stack.push(neighbor);
                }
            }
        }
    }
}
