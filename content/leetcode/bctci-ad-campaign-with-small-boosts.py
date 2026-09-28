class Solution:
    def _boost_cost(self, value, blocked_cost):
        if value < 5:
            return blocked_cost
        if value < 10:
            return 1
        return 0

    def longestWithSmallBoosts(self, sales, k):
        left = cost = best = 0
        blocked_cost = len(sales) + 1
        for right, value in enumerate(sales):
            cost += self._boost_cost(value, blocked_cost)
            while cost > k:
                cost -= self._boost_cost(sales[left], blocked_cost)
                left += 1
            best = max(best, right - left + 1)
        return best
