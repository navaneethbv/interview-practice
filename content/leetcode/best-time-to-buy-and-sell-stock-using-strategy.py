class Solution:
    def maxProfit(self, prices, strategy, k):
        original = [0]
        price_totals = [0]
        for price, action in zip(prices, strategy):
            original.append(original[-1] + price * action)
            price_totals.append(price_totals[-1] + price)

        best = original[-1]
        for start in range(len(prices) - k + 1):
            end = start + k
            changed_value = price_totals[end] - price_totals[start + k // 2]
            original_value = original[end] - original[start]
            best = max(best, original[-1] + changed_value - original_value)
        return best
