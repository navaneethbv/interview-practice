class Solution:
    def maxProfit(self, prices):
        low, best = prices[0], 0
        for price in prices:
            best = max(best, price - low)
            low = min(low, price)
        return best
