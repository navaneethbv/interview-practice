class Solution {
    public int longestWithThreeBadDays(int[] sales) {
        int left = 0;
        long cost = 0;
        int best = 0;
        for (int right = 0; right < sales.length; right++) {
            cost += (sales[right] < 10 ? 1 : 0);
            while (cost > 3) {
                cost -= (sales[left] < 10 ? 1 : 0);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
