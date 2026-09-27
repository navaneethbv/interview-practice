class Solution:
    def maxProfit(self, prices):
        holding = -prices[0]
        sold = float('-inf')
        resting = 0

        for day in range(1, len(prices)):
            price = prices[day]
            next_holding = max(holding, resting - price)
            next_sold = holding + price
            next_resting = max(resting, sold)
            holding, sold, resting = next_holding, next_sold, next_resting

        return max(sold, resting)
