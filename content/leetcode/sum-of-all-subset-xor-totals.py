class Solution:
    def subsetXORSum(self, nums):
        combined = 0
        for value in nums:
            combined |= value
        return combined * (1 << (len(nums) - 1))
