class Solution {
    public int minDetourK(int[] times, int k) {
        int n = times.length;
        int[] best = new int[n + 1];
        for (int stop = 0; stop < n; stop++) {
            int cheapest = 0;
            if (stop > k) {
                cheapest = Integer.MAX_VALUE;
                for (int gap = 0; gap <= k; gap++) {
                    cheapest = Math.min(cheapest, best[stop - gap]);
                }
            }
            best[stop + 1] = times[stop] + cheapest;
        }
        int answer = Integer.MAX_VALUE;
        for (int last = Math.max(0, n - k); last <= n; last++) {
            answer = Math.min(answer, best[last]);
        }
        return answer;
    }
}
