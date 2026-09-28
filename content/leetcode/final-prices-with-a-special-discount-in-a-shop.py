class Solution:
    def finalPrices(self, prices):
        result = prices[:]
        stack = []
        for index, price in enumerate(prices):
            while stack and prices[stack[-1]] >= price:
                result[stack.pop()] -= price
            stack.append(index)
        return result
