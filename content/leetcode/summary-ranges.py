class Solution:
    def summaryRanges(self, nums):
        out=[];i=0
        while i<len(nums):
            j=i
            while j+1<len(nums) and nums[j+1]==nums[j]+1:j+=1
            out.append(str(nums[i]) if i==j else str(nums[i])+'->'+str(nums[j]));i=j+1
        return out
