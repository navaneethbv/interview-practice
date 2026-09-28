class Solution:
    def search(self, reader, target):
        bound = 1
        while reader.get(bound - 1) < target:
            bound *= 2
        low, high = bound // 2, bound - 1
        while low <= high:
            mid = (low + high) // 2
            value = reader.get(mid)
            if value == target:
                return mid
            if value < target:
                low = mid + 1
            else:
                high = mid - 1
        return -1
