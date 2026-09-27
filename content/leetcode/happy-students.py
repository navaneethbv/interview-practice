class Solution:
    def countWays(self, nums):
        nums.sort();n=len(nums)
        return sum((k==0 or nums[k-1]<k) and (k==n or nums[k]>k) for k in range(n+1))
