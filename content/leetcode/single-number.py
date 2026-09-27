class Solution:
    def singleNumber(self, nums):
        result = 0
        for value in nums:
            result ^= value
        return result
