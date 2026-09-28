class Solution {
    public long maxProfit(int[] prices, int[] strategy, int k) {
        int n = prices.length;
        long[] original = new long[n + 1];
        long[] priceTotals = new long[n + 1];
        for (int index = 0; index < n; index++) {
            original[index + 1] = original[index] + (long) prices[index] * strategy[index];
            priceTotals[index + 1] = priceTotals[index] + prices[index];
        }

        long best = original[n];
        for (int start = 0; start + k <= n; start++) {
            int end = start + k;
            long changedValue = priceTotals[end] - priceTotals[start + k / 2];
            long originalValue = original[end] - original[start];
            best = Math.max(best, original[n] + changedValue - originalValue);
        }
        return best;
    }
}
