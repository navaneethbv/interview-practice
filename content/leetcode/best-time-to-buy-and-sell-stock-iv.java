class Solution {
    public int maxProfit(int k, int[] prices) {
        if (k >= prices.length / 2) {
            return unlimitedProfit(prices);
        }
        int[] buy = new int[k + 1];
        int[] sell = new int[k + 1];
        Arrays.fill(buy, Integer.MIN_VALUE / 2);
        for (int price : prices) {
            for (int transaction = 1; transaction <= k; transaction++) {
                buy[transaction] = Math.max(buy[transaction], sell[transaction - 1] - price);
                sell[transaction] = Math.max(sell[transaction], buy[transaction] + price);
            }
        }
        return sell[k];
    }

    private int unlimitedProfit(int[] prices) {
        int profit = 0;
        for (int index = 1; index < prices.length; index++) {
            profit += Math.max(0, prices[index] - prices[index - 1]);
        }
        return profit;
    }
}
