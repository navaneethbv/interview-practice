class Solution:
    def maxProfit(self, prices, fee):
        cash = 0
        holding = -prices[0]
        for index in range(1, len(prices)):
            price = prices[index]
            previous_cash = cash
            cash = max(cash, holding + price - fee)
            holding = max(holding, previous_cash - price)
        return cash
