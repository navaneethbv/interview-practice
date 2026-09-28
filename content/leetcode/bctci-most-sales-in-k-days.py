class Solution:
    def bestPeriodStart(self, sales, k):
        window = best = sum(sales[:k])
        best_start = 0
        for day in range(k, len(sales)):
            window += sales[day] - sales[day - k]
            if window > best:
                best, best_start = window, day - k + 1
        return best_start
