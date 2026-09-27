class Solution:
    def firstBadVersion(self, n):
        lower = 1
        upper = n
        while lower < upper:
            middle = lower + (upper - lower) // 2
            if isBadVersion(middle):
                upper = middle
            else:
                lower = middle + 1
        return lower
