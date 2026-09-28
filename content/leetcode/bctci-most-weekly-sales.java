class Solution {
    public int mostWeeklySales(int[] sales) {
        if (sales.length < 7) {
            return 0;
        }
        int window = 0;
        for (int day = 0; day < 7; day++) {
            window += sales[day];
        }
        int best = window;
        for (int day = 7; day < sales.length; day++) {
            window += sales[day] - sales[day - 7];
            best = Math.max(best, window);
        }
        return best;
    }
}
