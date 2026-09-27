class Solution:
    def longestNiceSubarray(self, nums):
        mask=left=best=0
        for right,value in enumerate(nums):
            while mask&value: mask^=nums[left]; left+=1
            mask|=value; best=max(best,right-left+1)
        return best
