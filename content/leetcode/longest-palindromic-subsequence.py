class Solution:
    def longestPalindromeSubseq(self,s):
        n=len(s);dp=[0]*n
        for i in range(n-1,-1,-1):
            previous=0;dp[i]=1
            for j in range(i+1,n):
                old=dp[j]
                dp[j]=previous+2 if s[i]==s[j] else max(dp[j],dp[j-1])
                previous=old
        return dp[-1]
