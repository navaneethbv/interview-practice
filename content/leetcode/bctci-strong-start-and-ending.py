class Solution:
    def strongStartAndEnd(self, sales, k):
        n = len(sales)
        must_keep = sum(1 for value in sales if value < 10) - k
        if must_keep <= 0:
            return n
        left = bad = 0
        shortest = n
        for right, value in enumerate(sales):
            bad += value < 10
            while bad - (sales[left] < 10) >= must_keep:
                bad -= sales[left] < 10
                left += 1
            if bad >= must_keep:
                shortest = min(shortest, right - left + 1)
        return n - shortest
