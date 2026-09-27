class Solution:
    def isMatch(self, s, p):
        dp = [[False]*(len(p)+1) for _ in range(len(s)+1)]
        dp[0][0] = True
        for j in range(2,len(p)+1):
            if p[j-1] == '*':
                dp[0][j] = dp[0][j-2]
        for i in range(1,len(s)+1):
            for j in range(1,len(p)+1):
                if p[j-1] == '*':
                    dp[i][j] = dp[i][j-2] or (p[j-2] in ('.',s[i-1]) and dp[i-1][j])
                else:
                    dp[i][j] = p[j-1] in ('.',s[i-1]) and dp[i-1][j-1]
        return dp[-1][-1]
