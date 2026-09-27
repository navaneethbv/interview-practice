class Solution:
    def arrayNesting(self,nums):
        seen=set();best=0
        for i in range(len(nums)):
            count=0
            while i not in seen:seen.add(i);count+=1;i=nums[i]
            best=max(best,count)
        return best
