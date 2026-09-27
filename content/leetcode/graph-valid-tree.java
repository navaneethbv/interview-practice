class Solution {
    public boolean validTree(int n, int[][] edges) {
        if (edges.length != n - 1) {
            return false;
        }
        List<List<Integer>> neighbors = adjacency(n, edges);
        boolean[] seen = new boolean[n];
        Deque<Integer> pending = new ArrayDeque<>();
        seen[0] = true;
        pending.push(0);
        int reached = 1;
        while (!pending.isEmpty()) {
            int vertex = pending.pop();
            for (int neighbor : neighbors.get(vertex)) {
                if (!seen[neighbor]) {
                    seen[neighbor] = true;
                    reached++;
                    pending.push(neighbor);
                }
            }
        }
        return reached == n;
    }

    private List<List<Integer>> adjacency(int n, int[][] edges) {
        List<List<Integer>> neighbors = new ArrayList<>();
        for (int vertex = 0; vertex < n; vertex++) {
            neighbors.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            neighbors.get(edge[0]).add(edge[1]);
            neighbors.get(edge[1]).add(edge[0]);
        }
        return neighbors;
    }
}
