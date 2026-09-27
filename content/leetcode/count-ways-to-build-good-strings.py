class Solution:
    def countGoodStrings(self,low,high,zero,one):
        mod=1000000007;dp=[0]*(high+1);dp[0]=1
        for i in range(1,high+1):dp[i]=((dp[i-zero] if i>=zero else 0)+(dp[i-one] if i>=one else 0))%mod
        return sum(dp[low:])%mod
