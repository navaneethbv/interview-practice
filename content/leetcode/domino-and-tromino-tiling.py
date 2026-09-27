class Solution:
    def numTilings(self, n):
        dp=[1,1,2]
        for width in range(3,n+1): dp.append((2*dp[-1]+dp[-3])%1000000007)
        return dp[n]
