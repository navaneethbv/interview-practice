class Solution:
    def runningSum(self, nums):
        total=0;out=[]
        for x in nums:total+=x;out.append(total)
        return out
