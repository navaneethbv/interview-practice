class Solution:
    def check(self, nums):
        return sum(nums[i]>nums[(i+1)%len(nums)] for i in range(len(nums)))<=1
