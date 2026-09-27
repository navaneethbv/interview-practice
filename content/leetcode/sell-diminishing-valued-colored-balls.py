class Solution:
    def maxProfit(self, inventory, orders):
        values = sorted(inventory, reverse=True) + [0]
        profit = 0
        for index in range(len(inventory)):
            width = index + 1
            high = values[index]
            low = values[index + 1]
            available = (high - low) * width
            if orders >= available:
                profit += (high + low + 1) * (high - low) // 2 * width
                orders -= available
            else:
                levels, extra = divmod(orders, width)
                bottom = high - levels
                profit += (high + bottom + 1) * levels // 2 * width + extra * bottom
                break
        return profit % 1000000007
