class Solution:
    def isValidPalindrome(self, s, k):
        dp=[0]*len(s)
        for left in range(len(s)-2,-1,-1):
            diagonal=0
            for right in range(left+1,len(s)):
                old=dp[right]
                dp[right]=diagonal if s[left]==s[right] else 1+min(dp[right],dp[right-1])
                diagonal=old
        return dp[-1]<=k
