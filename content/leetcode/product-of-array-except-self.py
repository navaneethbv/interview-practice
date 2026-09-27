class Solution:
    def productExceptSelf(self, nums):
        result, prefix = [], 1
        for value in nums:
            result.append(prefix)
            prefix *= value
        suffix = 1
        for i in range(len(nums)-1, -1, -1):
            result[i] *= suffix
            suffix *= nums[i]
        return result
