class Solution:
    def minOperations(self, nums, x):
        target=sum(nums)-x
        if target<0:return -1
        if target==0:return len(nums)
        left=total=0;best=-1
        for right,value in enumerate(nums):
            total+=value
            while total>target:total-=nums[left];left+=1
            if total==target:best=max(best,right-left+1)
        return len(nums)-best if best>=0 else -1
