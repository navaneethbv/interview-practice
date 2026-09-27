class Solution:
    def firstMissingPositive(self, nums):
        n=len(nums)
        for i in range(n):
            while 1<=nums[i]<=n and nums[nums[i]-1]!=nums[i]:
                j=nums[i]-1
                nums[i],nums[j]=nums[j],nums[i]
        for i,v in enumerate(nums,1):
            if v!=i:return i
        return n+1
