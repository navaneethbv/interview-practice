class Solution:
    def getMinDistance(self, nums, target, start):return min(abs(i-start) for i,value in enumerate(nums) if value==target)
