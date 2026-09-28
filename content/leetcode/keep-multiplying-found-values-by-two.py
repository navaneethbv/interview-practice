class Solution:
    def findFinalValue(self, nums, original):
        values = set(nums)
        while original in values:
            original *= 2
        return original
