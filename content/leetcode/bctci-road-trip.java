class Solution {
    public int minDetour(int[] times) {
        int n = times.length;
        if (n < 3) {
            return 0;
        }
        int[] best = new int[n + 1];
        for (int stop = 0; stop < n; stop++) {
            int cheapest = stop >= 3 ? Math.min(best[stop], Math.min(best[stop - 1], best[stop - 2])) : 0;
            best[stop + 1] = times[stop] + cheapest;
        }
        return Math.min(best[n], Math.min(best[n - 1], best[n - 2]));
    }
}
