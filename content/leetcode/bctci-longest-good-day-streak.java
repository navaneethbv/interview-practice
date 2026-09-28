class Solution {
    public int longestGoodStreak(int[] sales) {
        int best = 0;
        int run = 0;
        for (int value : sales) {
            run = value >= 10 ? run + 1 : 0;
            best = Math.max(best, run);
        }
        return best;
    }
}
