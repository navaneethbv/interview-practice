class Solution:
    def longestWithSmallBoosts(self, sales, k):
        left = cost = best = 0
        for right, value in enumerate(sales):
            cost += self._boost_cost(value, len(sales) + 1)
            while cost > k:
                cost -= self._boost_cost(sales[left], len(sales) + 1)
                left += 1
            best = max(best, right - left + 1)
        return best

    @staticmethod
    def _boost_cost(value, unboostable_cost):
        if value < 5:
            return unboostable_cost
        return 1 if value < 10 else 0
