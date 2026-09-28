class Solution:
    def pourCount(self, a, b):
        low, high = 1, a
        while low < high:
            mid = (low + high + 1) >> 1
            if mid * b <= a:
                low = mid
            else:
                high = mid - 1
        return low
