class Solution:
    def removeDuplicates(self, nums):
        k=0
        for value in nums:
            if k==0 or value!=nums[k-1]: nums[k]=value; k+=1
        return k
