class Solution:
    def minimumPairRemoval(self, nums):
        nums=nums[:]; operations=0
        while any(a>b for a,b in zip(nums,nums[1:])):
            index=min(range(len(nums)-1),key=lambda i:nums[i]+nums[i+1]); nums[index:index+2]=[nums[index]+nums[index+1]]; operations+=1
        return operations
