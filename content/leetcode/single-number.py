class Solution:
    def singleNumber(self, nums):
        unique_value = 0
        for value in nums:
            unique_value ^= value
        return unique_value
