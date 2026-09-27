class Solution:
    def maxSubArray(self, nums):
        best = current = nums[0]
        for index in range(1, len(nums)):
            value = nums[index]
            current = max(value, current + value)
            best = max(best, current)
        return best
