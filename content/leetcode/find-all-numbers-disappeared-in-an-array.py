class Solution:
    def findDisappearedNumbers(self, nums):
        for x in nums:
            index=abs(x)-1;nums[index]=-abs(nums[index])
        return [i+1 for i,x in enumerate(nums) if x>0]
