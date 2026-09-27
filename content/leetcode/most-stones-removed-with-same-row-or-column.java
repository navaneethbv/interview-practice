class Solution {
    public int removeStones(int[][] stones) {
        Map<Integer, Integer> parent = new HashMap<>();
        Map<Integer, Integer> sizes = new HashMap<>();
        int components = 0;
        for (int[] stone : stones) {
            int row = stone[0];
            int column = ~stone[1];
            if (!parent.containsKey(row)) {
                parent.put(row, row);
                sizes.put(row, 1);
                components++;
            }
            if (!parent.containsKey(column)) {
                parent.put(column, column);
                sizes.put(column, 1);
                components++;
            }
            int rowRoot = find(parent, row);
            int columnRoot = find(parent, column);
            union(parent, sizes, rowRoot, columnRoot);
            if (rowRoot != columnRoot) {
                components--;
            }
        }
        return stones.length - components;
    }

    private void union(Map<Integer, Integer> parent, Map<Integer, Integer> sizes,
            int first, int second) {
        if (first == second) {
            return;
        }
        if (sizes.get(first) < sizes.get(second)) {
            int swap = first;
            first = second;
            second = swap;
        }
        parent.put(second, first);
        sizes.put(first, sizes.get(first) + sizes.get(second));
    }

    private int find(Map<Integer, Integer> parent, int node) {
        int root = node;
        while (root != parent.get(root)) {
            root = parent.get(root);
        }
        while (node != root) {
            int next = parent.get(node);
            parent.put(node, root);
            node = next;
        }
        return root;
    }
}
