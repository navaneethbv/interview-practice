class DisjointSets {
    int[] parent;
    int[] sizes;
    int groups;
    int largest;

    DisjointSets(int n) {
        parent = new int[n];
        sizes = new int[n];
        groups = n;
        largest = n == 0 ? 0 : 1;
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            sizes[i] = 1;
        }
    }

    int find(int node) {
        while (node != parent[node]) {
            parent[node] = parent[parent[node]];
            node = parent[node];
        }
        return node;
    }

    boolean join(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b) {
            return false;
        }
        if (sizes[a] < sizes[b]) {
            int temporary = a;
            a = b;
            b = temporary;
        }
        parent[b] = a;
        sizes[a] += sizes[b];
        groups--;
        largest = Math.max(largest, sizes[a]);
        return true;
    }
}

class Solution {
    public boolean solve(int V, int[][] edges, int i) {
        DisjointSets sets = new DisjointSets(V);
        int[] target = edges[i];
        for (int index = 0; index < edges.length; index++) {
            int[] edge = edges[index];
            if (index != i && edge[2] <= target[2]) {
                sets.join(edge[0], edge[1]);
            }
        }
        return sets.find(target[0]) != sets.find(target[1]);
    }
}
