class Solution {
    private int find(int node, int[] parent) {
        while (node != parent[node]) {
            parent[node] = parent[parent[node]];
            node = parent[node];
        }
        return node;
    }

    private boolean join(int a, int b, int[] parent, int[] sizes) {
        a = find(a, parent);
        b = find(b, parent);
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
        return true;
    }

    public int solve(int[][] players) {
        int[] parent = new int[players.length];
        int[] sizes = new int[players.length];
        for (int i = 0; i < players.length; i++) {
            parent[i] = i;
            sizes[i] = 1;
        }
        List<Map<Integer, Integer>> coordinates = List.of(new HashMap<>(), new HashMap<>());
        int groups = players.length;
        for (int index = 0; index < players.length; index++) {
            for (int axis = 0; axis < 2; axis++) {
                Integer other = coordinates.get(axis).put(players[index][axis], index);
                if (other != null && join(index, other, parent, sizes)) {
                    groups--;
                }
            }
        }
        return groups;
    }
}
