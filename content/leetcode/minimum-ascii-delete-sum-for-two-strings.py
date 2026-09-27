class Solution:
    def minimumDeleteSum(self,s1,s2):
        dp=[0]
        for c in s2:dp.append(dp[-1]+ord(c))
        for a in s1:
            previous=dp[0];dp[0]+=ord(a)
            for j,b in enumerate(s2,1):
                old=dp[j];dp[j]=previous if a==b else min(dp[j]+ord(a),dp[j-1]+ord(b));previous=old
        return dp[-1]
