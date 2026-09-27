class Solution:
    def minPatches(self,nums,n):
        missing=1;i=patches=0
        while missing<=n:
            if i<len(nums) and nums[i]<=missing:missing+=nums[i];i+=1
            else:missing*=2;patches+=1
        return patches
