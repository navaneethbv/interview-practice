class Solution:
    def rearrangeArray(self, nums):
        result=[0]*len(nums); positive,negative=0,1
        for value in nums:
            if value>0: result[positive]=value; positive+=2
            else: result[negative]=value; negative+=2
        return result
