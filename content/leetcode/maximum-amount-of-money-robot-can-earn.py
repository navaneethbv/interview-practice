class Solution:
 def maximumAmount(self,coins):
  m,n=len(coins),len(coins[0]);neg=-10**15;dp=[[[neg]*3 for _ in range(n)] for _ in range(m)]
  for i in range(m):
   for j in range(n):
    v=coins[i][j]
    for used in range(3):
     prev=0 if i==j==0 and used==0 else max(dp[i-1][j][used] if i else neg,dp[i][j-1][used] if j else neg)
     dp[i][j][used]=max(dp[i][j][used],prev+v)
     if v<0 and used<2:dp[i][j][used+1]=max(dp[i][j][used+1],prev)
  return max(dp[-1][-1])
