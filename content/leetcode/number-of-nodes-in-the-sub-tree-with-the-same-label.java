class Solution {
public int[] countSubTrees(int n, int[][] edges, String labels) {
    List<List<Integer>> adjacency = new ArrayList<>();
    for (int node = 0; node < n; node++) {
        adjacency.add(new ArrayList<>());
    }
    for (int[] edge : edges) {
        adjacency.get(edge[0]).add(edge[1]);
        adjacency.get(edge[1]).add(edge[0]);
    }
    int[] parent = new int[n];
    int[] order = new int[n];
    int[] result = new int[n];
    Arrays.fill(parent, -1);
    int orderSize = 1;
    for (int index = 0; index < orderSize; index++) {
        int node = order[index];
        for (int child : adjacency.get(node)) {
            if (child != parent[node]) {
                parent[child] = node;
                order[orderSize++] = child;
            }
        }
    }
    int[][] counts = new int[n][26];
    for (int index = n - 1; index >= 0; index--) {
        int node = order[index];
        int labelIndex = labels.charAt(node) - 'a';
        counts[node][labelIndex]++;
        result[node] = counts[node][labelIndex];
        if (parent[node] >= 0) {
            for (int label = 0; label < 26; label++) {
                counts[parent[node]][label] += counts[node][label];
            }
        }
    }
    return result;
}
}
