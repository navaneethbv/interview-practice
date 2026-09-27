class Solution {
    public int maxProfit(int[] prices) {
        int low = prices[0];
        int best = 0;
        for (int price : prices) {
            best = Math.max(best, price - low);
            low = Math.min(low, price);
        }
        return best;
    }
}
