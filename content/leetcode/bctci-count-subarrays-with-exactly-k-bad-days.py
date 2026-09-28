class Solution:
    def countExactlyKBad(self, sales, k):
        return self._at_most(sales, k) - self._at_most(sales, k - 1)

    def _at_most(self, sales, k):
        if k < 0:
            return 0
        left = bad = total = 0
        for right, value in enumerate(sales):
            bad += value < 10
            while bad > k:
                bad -= sales[left] < 10
                left += 1
            total += right - left + 1
        return total
