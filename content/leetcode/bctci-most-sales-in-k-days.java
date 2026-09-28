class Solution {
    public int bestPeriodStart(int[] sales, int k) {
        int window = 0;
        for (int day = 0; day < k; day++) {
            window += sales[day];
        }
        int best = window;
        int bestStart = 0;
        for (int day = k; day < sales.length; day++) {
            window += sales[day] - sales[day - k];
            if (window > best) {
                best = window;
                bestStart = day - k + 1;
            }
        }
        return bestStart;
    }
}
