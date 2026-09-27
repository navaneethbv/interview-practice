class Solution {
    public int minCostToSupplyWater(int n, int[] wells, int[][] pipes) {
        List<int[]> edges = new ArrayList<>();
        for (int house = 1; house <= n; house++) {
            edges.add(new int[]{wells[house - 1], 0, house});
        }
        for (int[] pipe : pipes) {
            edges.add(new int[]{pipe[2], pipe[0], pipe[1]});
        }
        edges.sort(Comparator.comparingInt(edge -> edge[0]));
        DisjointSet components = new DisjointSet(n + 1);
        int total = 0;
        for (int[] edge : edges) {
            if (components.union(edge[1], edge[2])) {
                total += edge[0];
            }
        }
        return total;
    }

    private static class DisjointSet {
        private final int[] parent;
        private final int[] size;

        DisjointSet(int count) {
            parent = new int[count];
            size = new int[count];
            for (int node = 0; node < count; node++) {
                parent[node] = node;
                size[node] = 1;
            }
        }

        private int find(int node) {
            while (parent[node] != node) {
                parent[node] = parent[parent[node]];
                node = parent[node];
            }
            return node;
        }

        boolean union(int first, int second) {
            int firstRoot = find(first);
            int secondRoot = find(second);
            if (firstRoot == secondRoot) {
                return false;
            }
            if (size[firstRoot] < size[secondRoot]) {
                int temporary = firstRoot;
                firstRoot = secondRoot;
                secondRoot = temporary;
            }
            parent[secondRoot] = firstRoot;
            size[firstRoot] += size[secondRoot];
            return true;
        }
    }
}
