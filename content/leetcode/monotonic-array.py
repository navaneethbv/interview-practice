class Solution:
    def isMonotonic(self, nums):
        nondecreasing = True
        nonincreasing = True
        for index in range(1, len(nums)):
            previous = nums[index - 1]
            current = nums[index]
            nondecreasing &= previous <= current
            nonincreasing &= previous >= current
        return nondecreasing or nonincreasing
