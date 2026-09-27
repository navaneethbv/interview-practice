class Solution:
    def isInterleave(self, s1, s2, s3):
        if len(s1)+len(s2) != len(s3):
            return False
        dp = [False]*(len(s2)+1)
        dp[0] = True
        for i in range(len(s1)+1):
            for j in range(len(s2)+1):
                if i == j == 0:
                    continue
                dp[j] = (i>0 and dp[j] and s1[i-1] == s3[i+j-1]) or (j>0 and dp[j-1] and s2[j-1] == s3[i+j-1])
        return dp[-1]
