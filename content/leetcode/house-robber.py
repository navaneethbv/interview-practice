class Solution:
    def rob(self, nums):
        older = previous = 0
        for value in nums:
            older, previous = previous, max(previous, older+value)
        return previous
