class Solution {
    public long maximumCoins(int[][] coins, int k) {
        Arrays.sort(coins, Comparator.comparingInt(row -> row[0]));
        long[] prefix = new long[coins.length + 1];
        for (int i = 0; i < coins.length; i++) {
            prefix[i + 1] = prefix[i] + ((long) coins[i][1] - coins[i][0] + 1) * coins[i][2];
        }
        long best = 0;
        for (int[] interval : coins) {
            long[] starts = {interval[0], Math.max(1L, (long) interval[1] - k + 1)};
            for (long start : starts) {
                long current = totalThrough(coins, prefix, start + k - 1)
                    - totalThrough(coins, prefix, start - 1);
                best = Math.max(best, current);
            }
        }
        return best;
    }

    private long totalThrough(int[][] coins, long[] prefix, long coordinate) {
        int low = 0;
        int high = coins.length;
        while (low < high) {
            int middle = low + (high - low) / 2;
            if (coins[middle][0] <= coordinate) {
                low = middle + 1;
            } else {
                high = middle;
            }
        }
        int index = low - 1;
        if (index < 0) {
            return 0;
        }
        int[] interval = coins[index];
        long length = Math.min(coordinate, interval[1]) - interval[0] + 1;
        return prefix[index] + length * interval[2];
    }
}
