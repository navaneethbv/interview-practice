class Solution:
    def arrangeCoins(self, n):
        left,right=0,n
        while left<=right:
            middle=(left+right)//2
            if middle*(middle+1)//2<=n: left=middle+1
            else: right=middle-1
        return right
