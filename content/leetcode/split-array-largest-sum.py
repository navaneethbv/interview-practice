class Solution:
    def splitArray(self, nums, k):
        left,right=max(nums),sum(nums)
        while left<right:
            middle=(left+right)//2; parts=1; total=0
            for value in nums:
                if total+value>middle: parts+=1; total=0
                total+=value
            if parts<=k: right=middle
            else: left=middle+1
        return left
