class Solution:
    def smallestDivisor(self, nums, threshold):
        left,right=1,max(nums)
        while left<right:
            middle=(left+right)//2
            if sum((n+middle-1)//middle for n in nums)<=threshold: right=middle
            else: left=middle+1
        return left
