class Solution:
    def productExceptSelf(self, nums):
        result = []
        prefix = 1
        for value in nums:
            result.append(prefix)
            prefix *= value
        suffix = 1
        for index in range(len(nums) - 1, -1, -1):
            result[index] *= suffix
            suffix *= nums[index]
        return result
