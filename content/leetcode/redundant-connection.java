class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        int[] parent = new int[edges.length + 1];
        int[] size = new int[parent.length];
        for (int node = 0; node < parent.length; node++) {
            parent[node] = node;
            size[node] = 1;
        }
        for (int[] edge : edges) {
            int first = find(parent, edge[0]);
            int second = find(parent, edge[1]);
            if (first == second) {
                return edge;
            }
            union(parent, size, first, second);
        }
        return new int[0];
    }
    private int find(int[] parent, int node) {
        while (parent[node] != node) {
            parent[node] = parent[parent[node]];
            node = parent[node];
        }
        return node;
    }
    private void union(int[] parent, int[] size, int first, int second) {
        if (size[first] < size[second]) {
            int temporary = first;
            first = second;
            second = temporary;
        }
        parent[second] = first;
        size[first] += size[second];
    }
}
