class Solution:
    def numOfPairs(self,nums,target):return sum(i!=j and a+b==target for i,a in enumerate(nums) for j,b in enumerate(nums))
