class Solution {
    public int longestWithSmallBoosts(int[] sales, int k) {
        int left = 0;
        long cost = 0;
        int best = 0;
        for (int right = 0; right < sales.length; right++) {
            cost += (sales[right] >= 5 && sales[right] < 10 ? 1 : (sales[right] < 5 ? sales.length + 1L : 0));
            while (cost > k) {
                cost -= (sales[left] >= 5 && sales[left] < 10 ? 1 : (sales[left] < 5 ? sales.length + 1L : 0));
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
