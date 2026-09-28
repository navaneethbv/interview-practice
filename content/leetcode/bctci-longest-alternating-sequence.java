class Solution {
    public int longestAlternating(int[] sales) {
        int best = 0;
        int run = 0;
        for (int day = 0; day < sales.length; day++) {
            boolean alternates = day > 0 && (sales[day] >= 10) != (sales[day - 1] >= 10);
            run = alternates ? run + 1 : 1;
            best = Math.max(best, run);
        }
        return best;
    }
}
