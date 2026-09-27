class Solution:
    def maxProfit(self, k, prices):
        if k >= len(prices) // 2:
            return sum(max(0, prices[index] - prices[index - 1])
                       for index in range(1, len(prices)))
        buy = [float('-inf')] * (k + 1)
        sell = [0] * (k + 1)
        for price in prices:
            for transaction in range(1, k + 1):
                buy[transaction] = max(buy[transaction], sell[transaction - 1] - price)
                sell[transaction] = max(sell[transaction], buy[transaction] + price)
        return sell[k]
