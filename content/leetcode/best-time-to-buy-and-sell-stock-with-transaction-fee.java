class Solution {
    public int maxProfit(int[] prices, int fee) {
        int cash = 0;
        int holding = -prices[0];
        for (int index = 1; index < prices.length; index++) {
            int previousCash = cash;
            cash = Math.max(cash, holding + prices[index] - fee);
            holding = Math.max(holding, previousCash - prices[index]);
        }
        return cash;
    }
}
