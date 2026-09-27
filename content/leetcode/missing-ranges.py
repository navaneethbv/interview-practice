class Solution:
    def findMissingRanges(self, nums, lower, upper):
        result = []
        next_missing = lower
        for value in nums:
            if value > next_missing:
                result.append([next_missing, value - 1])
            next_missing = value + 1
        if next_missing <= upper:
            result.append([next_missing, upper])
        return result
