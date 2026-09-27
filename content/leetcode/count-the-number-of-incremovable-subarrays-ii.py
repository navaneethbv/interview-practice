class Solution:
    def incremovableSubarrayCount(self,nums):
        n=len(nums);i=0
        while i+1<n and nums[i]<nums[i+1]:i+=1
        if i==n-1:return n*(n+1)//2
        result=i+2;j=n-1
        while True:
            while i>=0 and nums[i]>=nums[j]:i-=1
            result+=i+2
            if j==0 or nums[j-1]>=nums[j]:break
            j-=1
        return result
