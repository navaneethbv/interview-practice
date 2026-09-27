class Solution:
    def numSquares(self, n):
        squares=[i*i for i in range(1,int(n**0.5)+1)];dp=[0]+[n]*n
        for value in range(1,n+1):
            for square in squares:
                if square>value:break
                dp[value]=min(dp[value],1+dp[value-square])
        return dp[n]
