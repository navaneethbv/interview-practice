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
    public long solve(int V, int[][] edges) {
        DisjointSets sets = new DisjointSets(V);
        Arrays.sort(edges, Comparator.comparingInt(edge -> edge[2]));
        long total = 0;
        for (int[] edge : edges) {
            if (sets.join(edge[0], edge[1])) {
                total += edge[2];
            }
        }
        return total;
    }
}
