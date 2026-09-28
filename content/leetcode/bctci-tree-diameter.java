class Solution {
    public int solve(String[] labels, int[][] children) {
        if (labels.length == 0) {
            return 0;
        }
        List<Integer> order = new ArrayList<>();
        order.add(0);
        for (int i = 0; i < order.size(); i++) {
            for (int child : children[order.get(i)]) {
                if (child != -1) {
                    order.add(child);
                }
            }
        }
        int[] heights = new int[labels.length];
        int best = 0;
        for (int i = order.size() - 1; i >= 0; i--) {
            int node = order.get(i);
            int left = children[node][0];
            int right = children[node][1];
            int a = left == -1 ? 0 : heights[left];
            int b = right == -1 ? 0 : heights[right];
            best = Math.max(best, a + b);
            heights[node] = 1 + Math.max(a, b);
        }
        return best;
    }
}
