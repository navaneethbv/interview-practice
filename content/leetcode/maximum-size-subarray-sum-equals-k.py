class Solution:
    def maxSubArrayLen(self, nums, k):
        first_prefix = {0: -1}
        prefix = 0
        best = 0
        for index, value in enumerate(nums):
            prefix += value
            if prefix - k in first_prefix:
                best = max(best, index - first_prefix[prefix - k])
            first_prefix.setdefault(prefix, index)
        return best
