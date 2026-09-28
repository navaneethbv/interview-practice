class Solution {
    public boolean equationsPossible(String[] equations) {
        int[] parent = new int[26];
        for (int node = 0; node < 26; node++) {
            parent[node] = node;
        }
        for (String equation : equations) {
            if (equation.charAt(1) == '=') {
                int left = equation.charAt(0) - 'a';
                int right = equation.charAt(3) - 'a';
                parent[find(parent, left)] = find(parent, right);
            }
        }
        for (String equation : equations) {
            if (equation.charAt(1) == '!') {
                int left = equation.charAt(0) - 'a';
                int right = equation.charAt(3) - 'a';
                if (find(parent, left) == find(parent, right)) {
                    return false;
                }
            }
        }
        return true;
    }

    private int find(int[] parent, int node) {
        while (parent[node] != node) {
            parent[node] = parent[parent[node]];
            node = parent[node];
        }
        return node;
    }
}
