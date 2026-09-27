class Solution {
    private static class DisjointSet {
        private final int[] parent;
        private final int[] componentSize;
        private int components;

        DisjointSet(int size) {
            parent = new int[size + 1];
            componentSize = new int[size + 1];
            components = size;
            for (int node = 1; node <= size; node++) {
                parent[node] = node;
                componentSize[node] = 1;
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
            if (componentSize[firstRoot] < componentSize[secondRoot]) {
                int temporary = firstRoot;
                firstRoot = secondRoot;
                secondRoot = temporary;
            }
            parent[secondRoot] = firstRoot;
            componentSize[firstRoot] += componentSize[secondRoot];
            components--;
            return true;
        }
    }

    public int maxNumEdgesToRemove(int n, int[][] edges) {
        DisjointSet alice = new DisjointSet(n);
        DisjointSet bob = new DisjointSet(n);
        Arrays.sort(edges, (first, second) -> Integer.compare(second[0], first[0]));
        int usedEdges = 0;
        for (int[] edge : edges) {
            usedEdges += useEdge(edge, alice, bob);
        }
        if (alice.components != 1 || bob.components != 1) {
            return -1;
        }
        return edges.length - usedEdges;
    }

    private int useEdge(int[] edge, DisjointSet alice, DisjointSet bob) {
        if (edge[0] == 1) {
            return alice.union(edge[1], edge[2]) ? 1 : 0;
        }
        if (edge[0] == 2) {
            return bob.union(edge[1], edge[2]) ? 1 : 0;
        }
        boolean joinsAlice = alice.union(edge[1], edge[2]);
        boolean joinsBob = bob.union(edge[1], edge[2]);
        return joinsAlice || joinsBob ? 1 : 0;
    }
}
