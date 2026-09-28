class Solution:
    def mostBalanced(self, pictures):
        total = len(pictures[0]) ** 2
        low, high = 0, len(pictures) - 1
        while low < high:
            mid = (low + high) // 2
            if 2 * self._flooded(pictures[mid]) >= total:
                high = mid
            else:
                low = mid + 1
        best = low
        if low > 0 and self._imbalance(pictures[low - 1], total) <= self._imbalance(pictures[low], total):
            best = low - 1
        return best

    def _imbalance(self, picture, total):
        return abs(2 * self._flooded(picture) - total)

    def _flooded(self, picture):
        return sum(self._ones(row) for row in picture)

    def _ones(self, row):
        low, high = 0, len(row)
        while low < high:
            mid = (low + high) // 2
            if row[mid] == "1":
                low = mid + 1
            else:
                high = mid
        return low
