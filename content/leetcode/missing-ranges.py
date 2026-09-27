class Solution:
    def findMissingRanges(self,nums,lower,upper):
        result=[];start=lower
        for value in nums+[upper+1]:
            if value>start:result.append([start,value-1])
            start=value+1
        return result
