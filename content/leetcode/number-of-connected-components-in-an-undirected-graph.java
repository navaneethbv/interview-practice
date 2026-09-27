class Solution {
    public int countComponents(int n, int[][] edges) {
        int[] parent = new int[n];
        int[] size = new int[n];
        for (int vertex = 0; vertex < n; vertex++) {
            parent[vertex] = vertex;
            size[vertex] = 1;
        }
        int components = n;
        for (int[] edge : edges) {
            if (unite(parent, size, edge[0], edge[1])) {
                components--;
            }
        }
        return components;
    }

    private int find(int[] parent, int vertex) {
        while (parent[vertex] != vertex) {
            parent[vertex] = parent[parent[vertex]];
            vertex = parent[vertex];
        }
        return vertex;
    }

    private boolean unite(int[] parent, int[] size, int first, int second) {
        int firstRoot = find(parent, first);
        int secondRoot = find(parent, second);
        if (firstRoot == secondRoot) {
            return false;
        }
        if (size[firstRoot] < size[secondRoot]) {
            int saved = firstRoot;
            firstRoot = secondRoot;
            secondRoot = saved;
        }
        parent[secondRoot] = firstRoot;
        size[firstRoot] += size[secondRoot];
        return true;
    }
}
