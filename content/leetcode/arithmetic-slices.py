class Solution:
    def numberOfArithmeticSlices(self, nums):
        ending=total=0
        for i in range(2,len(nums)):
            ending=ending+1 if nums[i]-nums[i-1]==nums[i-1]-nums[i-2] else 0; total+=ending
        return total
