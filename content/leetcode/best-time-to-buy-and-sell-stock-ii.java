class Solution {
    public int maxProfit(int[] prices) {
        int totalProfit = 0;
        for (int day = 1; day < prices.length; day++) {
            int priceChange = prices[day] - prices[day - 1];
            if (priceChange > 0) {
                totalProfit += priceChange;
            }
        }
        return totalProfit;
    }
}
