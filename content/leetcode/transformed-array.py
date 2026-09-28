class Solution:
    def constructTransformedArray(self, nums):
        size = len(nums)
        return [nums[(index + value) % size] for index, value in enumerate(nums)]
