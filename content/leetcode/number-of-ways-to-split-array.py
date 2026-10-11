class Solution:
    def waysToSplitArray(self, nums):
        total = sum(nums)
        left = 0
        count = 0
        for x in nums[:-1]:
            left += x
            if left >= total - left:
                count += 1
        return count
