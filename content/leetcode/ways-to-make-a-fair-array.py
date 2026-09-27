class Solution:
    def waysToMakeFair(self,nums):
        right=[sum(nums[::2]),sum(nums[1::2])];left=[0,0];count=0
        for i,v in enumerate(nums):
            right[i%2]-=v
            if left[0]+right[1]==left[1]+right[0]:count+=1
            left[i%2]+=v
        return count
