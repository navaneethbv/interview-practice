class Solution:
    def numSubarrayProductLessThanK(self,nums,k):
        if k<=1:return 0
        left=0;product=1;total=0
        for right,value in enumerate(nums):
            product*=value
            while product>=k:product//=nums[left];left+=1
            total+=right-left+1
        return total
