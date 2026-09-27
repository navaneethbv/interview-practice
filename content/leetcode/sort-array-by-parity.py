class Solution:
    def sortArrayByParity(self,nums):return [x for x in nums if x%2==0]+[x for x in nums if x%2]
