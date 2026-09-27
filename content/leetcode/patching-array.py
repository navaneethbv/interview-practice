class Solution:
    def minPatches(self, nums, n):
        next_missing = 1
        index = 0
        patches = 0
        while next_missing <= n:
            if index < len(nums) and nums[index] <= next_missing:
                next_missing += nums[index]
                index += 1
            else:
                next_missing *= 2
                patches += 1
        return patches
