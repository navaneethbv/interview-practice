class Solution:
    def maxProfit(self, prices):
        holding, sold, resting = -prices[0], float('-inf'), 0
        for price in prices[1:]:
            holding, sold, resting = max(holding,resting-price), holding+price, max(resting,sold)
        return max(sold,resting)
