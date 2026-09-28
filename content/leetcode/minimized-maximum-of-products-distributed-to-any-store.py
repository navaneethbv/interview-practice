class Solution:

    def minimizedMaximum(self, n, quantities):
        lo, hi = (1, max(quantities))
        while lo < hi:
            mid = (lo + hi) // 2
            if sum(((x + mid - 1) // mid for x in quantities)) <= n:
                hi = mid
            else:
                lo = mid + 1
        return lo
