class Solution:
    def longestWithThreeBadDays(self, sales):
        left = cost = best = 0
        for right, value in enumerate(sales):
            cost += (1 if value < 10 else 0)
            while cost > 3:
                cost -= (1 if sales[left] < 10 else 0)
                left += 1
            best = max(best, right - left + 1)
        return best
