class Solution:
    def maxProfit(self, prices):
        low = prices[0]
        best = 0
        for price in prices:
            best = max(best, price - low)
            low = min(low, price)
        return best
