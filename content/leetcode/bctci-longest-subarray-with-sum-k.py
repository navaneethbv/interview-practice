class Solution:
    def longestSumK(self, arr, k):
        first = {0: -1}
        prefix = 0
        best = -1
        for index, value in enumerate(arr):
            prefix += value
            if prefix - k in first:
                best = max(best, index - first[prefix - k])
            first.setdefault(prefix, index)
        return best
