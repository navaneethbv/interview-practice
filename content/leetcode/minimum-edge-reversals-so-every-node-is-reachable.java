class Solution {
    public int[] minEdgeReversals(int n, int[][] edges) {
        List<List<int[]>> graph = new ArrayList<>();
        for (int node = 0; node < n; node++) {
            graph.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            graph.get(edge[0]).add(new int[]{edge[1], 0});
            graph.get(edge[1]).add(new int[]{edge[0], 1});
        }

        int[] parent = new int[n];
        int[] edgeCost = new int[n];
        int[] order = new int[n];
        Arrays.fill(parent, -1);
        parent[0] = 0;
        int orderSize = 1;
        int rootCost = 0;
        for (int index = 0; index < orderSize; index++) {
            int node = order[index];
            for (int[] connection : graph.get(node)) {
                if (connection[0] == parent[node]) {
                    continue;
                }
                parent[connection[0]] = node;
                edgeCost[connection[0]] = connection[1];
                rootCost += connection[1];
                order[orderSize++] = connection[0];
            }
        }

        int[] answers = new int[n];
        answers[0] = rootCost;
        for (int index = 1; index < n; index++) {
            int node = order[index];
            answers[node] = answers[parent[node]] + 1 - 2 * edgeCost[node];
        }
        return answers;
    }
}
