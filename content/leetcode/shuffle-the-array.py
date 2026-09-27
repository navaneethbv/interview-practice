class Solution:
    def shuffle(self, nums, n):
        return [value for pair in zip(nums[:n],nums[n:]) for value in pair]
