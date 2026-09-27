class Solution {
    public List<Integer> findMinHeightTrees(int n, int[][] edges) {
        if (n == 1) {
            return Arrays.asList(0);
        }

        List<List<Integer>> neighbors = new ArrayList<>();
        int[] degrees = new int[n];
        for (int vertex = 0; vertex < n; vertex++) {
            neighbors.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            neighbors.get(edge[0]).add(edge[1]);
            neighbors.get(edge[1]).add(edge[0]);
            degrees[edge[0]]++;
            degrees[edge[1]]++;
        }

        Deque<Integer> leaves = new ArrayDeque<>();
        for (int vertex = 0; vertex < n; vertex++) {
            if (degrees[vertex] == 1) {
                leaves.add(vertex);
            }
        }

        int remainingVertices = n;
        while (remainingVertices > 2) {
            int leafCount = leaves.size();
            remainingVertices -= leafCount;
            for (int count = 0; count < leafCount; count++) {
                int leaf = leaves.remove();
                for (int neighbor : neighbors.get(leaf)) {
                    degrees[neighbor]--;
                    if (degrees[neighbor] == 1) {
                        leaves.add(neighbor);
                    }
                }
            }
        }
        return new ArrayList<>(leaves);
    }
}
