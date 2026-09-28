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
    public int[] solve(int V, int[][] edges, int[] times) {
        DisjointSets sets = new DisjointSets(V);
        Arrays.sort(edges, Comparator.comparingInt(edge -> edge[2]));
        int position = 0;
        int[] answer = new int[times.length];
        for (int query = 0; query < times.length; query++) {
            while (position < edges.length && edges[position][2] <= times[query]) {
                sets.join(edges[position][0], edges[position][1]);
                position++;
            }
            answer[query] = sets.groups;
        }
        return answer;
    }
}
