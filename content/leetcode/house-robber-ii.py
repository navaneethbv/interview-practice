class Solution:
    def rob(self, nums):
        if len(nums) == 1:
            return nums[0]
        def linear(values):
            older = previous = 0
            for value in values:
                older, previous = previous, max(previous, older+value)
            return previous
        return max(linear(nums[:-1]), linear(nums[1:]))
