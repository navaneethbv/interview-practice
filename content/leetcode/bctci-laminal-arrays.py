class Solution:
    def maxLaminalSum(self, arr):
        return self._solve(arr, 0, len(arr))[1]

    def _solve(self, arr, start, end):
        if end - start == 1:
            return arr[start], arr[start]
        mid = (start + end) // 2
        left_total, left_best = self._solve(arr, start, mid)
        right_total, right_best = self._solve(arr, mid, end)
        total = left_total + right_total
        return total, max(total, left_best, right_best)
