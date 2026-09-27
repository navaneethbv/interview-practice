class Solution:
    def longestOnes(self, nums, k):
        left=zeros=best=0
        for right,x in enumerate(nums):
            zeros+=x==0
            while zeros>k:zeros-=nums[left]==0;left+=1
            best=max(best,right-left+1)
        return best
