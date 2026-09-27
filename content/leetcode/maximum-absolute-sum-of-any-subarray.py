class Solution:
    def maxAbsoluteSum(self, nums):
        prefix = 0
        lowest = 0
        highest = 0
        for value in nums:
            prefix += value
            lowest = min(lowest, prefix)
            highest = max(highest, prefix)
        return highest - lowest
