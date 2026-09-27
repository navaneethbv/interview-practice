class Solution:
    def findDuplicates(self, nums):
        out=[]
        for x in nums:
            value=abs(x)
            if nums[value-1]<0:out.append(value)
            else:nums[value-1]*=-1
        return out
