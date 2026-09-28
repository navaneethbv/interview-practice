class Solution:
    def longestWithBoosts(self, sales, k):
        left = cost = best = 0
        for right, value in enumerate(sales):
            cost += (1 if value < 10 else 0)
            while cost > k:
                cost -= (1 if sales[left] < 10 else 0)
                left += 1
            best = max(best, right - left + 1)
        return best
