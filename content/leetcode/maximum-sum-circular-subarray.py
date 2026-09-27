class Solution:
    def maxSubarraySumCircular(self,nums):
        high=low=best=worst=nums[0]
        for x in nums[1:]:high=max(x,high+x);low=min(x,low+x);best=max(best,high);worst=min(worst,low)
        return best if best<0 else max(best,sum(nums)-worst)
