class Solution {
    public int longestCycle(int[] edges) {
        int n = edges.length;
        int[] seenAt = new int[n];
        int clock = 1;
        int best = -1;
        for (int start = 0; start < n; start++) {
            if (seenAt[start] != 0) {
                continue;
            }
            int walkStart = clock;
            int node = start;
            while (node != -1 && seenAt[node] == 0) {
                seenAt[node] = clock++;
                node = edges[node];
            }
            if (node != -1 && seenAt[node] >= walkStart) {
                best = Math.max(best, clock - seenAt[node]);
            }
        }
        return best;
    }
}
