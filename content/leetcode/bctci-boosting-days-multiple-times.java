class Solution {
    public int longestWithUnitBoosts(int[] sales, int k) {
        int left = 0;
        long cost = 0;
        int best = 0;
        for (int right = 0; right < sales.length; right++) {
            cost += Math.max(0, 10 - sales[right]);
            while (cost > k) {
                cost -= Math.max(0, 10 - sales[left]);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
