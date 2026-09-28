class Solution:
    def countGoodWithAtLeastK(self, sales, k):
        total = 0
        run_start = left = window = 0
        for right, value in enumerate(sales):
            if value < 10:
                run_start = left = right + 1
                window = 0
                continue
            window += value
            while left <= right and window - sales[left] >= k:
                window -= sales[left]
                left += 1
            if window >= k:
                total += left - run_start + 1
        return total
