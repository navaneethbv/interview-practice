class Solution:
    def mostWeeklySales(self, sales):
        if len(sales) < 7:
            return 0
        window = best = sum(sales[:7])
        for day in range(7, len(sales)):
            window += sales[day] - sales[day - 7]
            best = max(best, window)
        return best
