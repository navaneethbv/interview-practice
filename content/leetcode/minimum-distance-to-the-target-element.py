class Solution:
    def getMinDistance(self, nums, target, start):
        best = len(nums)
        for index, value in enumerate(nums):
            if value == target:
                best = min(best, abs(index - start))
        return best
