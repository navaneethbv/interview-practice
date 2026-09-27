class Solution:
    def subArrayRanges(self,nums):
        total=0
        for i in range(len(nums)):
            lo=hi=nums[i]
            for j in range(i+1,len(nums)):lo=min(lo,nums[j]);hi=max(hi,nums[j]);total+=hi-lo
        return total
