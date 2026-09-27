class Solution:
    def minimumTotal(self, triangle):
        dp=triangle[-1][:]
        for row in reversed(triangle[:-1]):
            for i,v in enumerate(row):dp[i]=v+min(dp[i],dp[i+1])
        return dp[0]
