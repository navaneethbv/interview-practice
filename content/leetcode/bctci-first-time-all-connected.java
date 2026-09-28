class Solution {
    private int[] parent;

    public int firstAllConnected(int V, int[][] cables) {
        parent = new int[V];
        for (int node = 0; node < V; node++) {
            parent[node] = node;
        }
        int components = V;
        for (int index = 0; index < cables.length; index++) {
            int rootA = find(cables[index][0]);
            int rootB = find(cables[index][1]);
            if (rootA != rootB) {
                parent[rootA] = rootB;
                if (--components == 1) {
                    return index;
                }
            }
        }
        return -1;
    }

    private int find(int node) {
        while (parent[node] != node) {
            parent[node] = parent[parent[node]];
            node = parent[node];
        }
        return node;
    }
}
