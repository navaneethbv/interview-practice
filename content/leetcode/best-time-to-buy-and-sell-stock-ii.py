class Solution:
    def maxProfit(self, prices):
        total_profit = 0
        for day in range(1, len(prices)):
            price_change = prices[day] - prices[day - 1]
            if price_change > 0:
                total_profit += price_change
        return total_profit
