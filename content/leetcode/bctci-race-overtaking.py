class Solution:
    def overtakeIndex(self, p1, p2):
        low, high = 0, len(p1) - 1
        while high - low > 1:
            mid = (low + high) // 2
            if p1[mid] > p2[mid]:
                low = mid
            else:
                high = mid
        return high
