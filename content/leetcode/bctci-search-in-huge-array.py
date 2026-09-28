class Solution:
    def searchHuge(self, reader, target):
        bound = 1
        while reader.get(bound - 1) < target:
            bound *= 2
        low, high = bound // 2, bound - 1
        while low < high:
            mid = (low + high) // 2
            if reader.get(mid) < target:
                low = mid + 1
            else:
                high = mid
        return low if reader.get(low) == target else -1
