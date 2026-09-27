class Solution:
    def longestNiceSubarray(self, nums):
        mask = 0
        left = 0
        best = 0
        for right, value in enumerate(nums):
            while mask & value:
                mask ^= nums[left]
                left += 1
            mask |= value
            best = max(best, right - left + 1)
        return best
