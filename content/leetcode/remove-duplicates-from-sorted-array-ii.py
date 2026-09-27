class Solution:
    def removeDuplicates(self, nums):
        write=0
        for value in nums:
            if write<2 or value!=nums[write-2]:nums[write]=value;write+=1
        return write
