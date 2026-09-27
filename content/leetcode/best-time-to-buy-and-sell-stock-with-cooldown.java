class Solution {
    public int maxProfit(int[] prices) {
        int holding = -prices[0];
        int sold = Integer.MIN_VALUE;
        int resting = 0;

        for (int index = 1; index < prices.length; index++) {
            int nextHolding = Math.max(holding, resting - prices[index]);
            int nextSold = holding + prices[index];
            int nextResting = Math.max(resting, sold);
            holding = nextHolding;
            sold = nextSold;
            resting = nextResting;
        }

        return Math.max(sold, resting);
    }
}
