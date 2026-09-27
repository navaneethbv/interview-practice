class Solution {
    private int find(int[] parent, int node) {
        while (parent[node] != node) {
            parent[node] = parent[parent[node]];
            node = parent[node];
        }
        return node;
    }

    public int makeConnected(int n, int[][] connections) {
        if (connections.length < n - 1) {
            return -1;
        }
        int[] parent = new int[n];
        int[] componentSize = new int[n];
        for (int node = 0; node < n; node++) {
            parent[node] = node;
            componentSize[node] = 1;
        }
        int components = n;
        for (int[] connection : connections) {
            int firstRoot = find(parent, connection[0]);
            int secondRoot = find(parent, connection[1]);
            if (firstRoot == secondRoot) {
                continue;
            }
            if (componentSize[firstRoot] > componentSize[secondRoot]) {
                int temporary = firstRoot;
                firstRoot = secondRoot;
                secondRoot = temporary;
            }
            parent[firstRoot] = secondRoot;
            componentSize[secondRoot] += componentSize[firstRoot];
            components--;
        }
        return components - 1;
    }
}
