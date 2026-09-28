class Solution:
    def longestWithUnitBoosts(self, sales, k):
        left = cost = best = 0
        for right, value in enumerate(sales):
            cost += max(0, 10 - value)
            while cost > k:
                cost -= max(0, 10 - sales[left])
                left += 1
            best = max(best, right - left + 1)
        return best
