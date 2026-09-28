class Solution:
    def minMedianSum(self, arr):
        ordered = sorted(arr)
        groups = len(arr) // 3
        return sum(ordered[2 * i + 1] for i in range(groups))
