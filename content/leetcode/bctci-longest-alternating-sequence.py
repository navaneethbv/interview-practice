class Solution:
    def longestAlternating(self, sales):
        best = run = 0
        for day, value in enumerate(sales):
            if day > 0 and (value >= 10) != (sales[day - 1] >= 10):
                run += 1
            else:
                run = 1
            best = max(best, run)
        return best
