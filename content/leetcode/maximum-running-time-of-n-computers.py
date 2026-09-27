class Solution:
    def maxRunTime(self, n, batteries):
        left,right=0,sum(batteries)//n
        while left<right:
            middle=(left+right+1)//2
            if sum(min(b,middle) for b in batteries)>=n*middle: left=middle
            else: right=middle-1
        return left
