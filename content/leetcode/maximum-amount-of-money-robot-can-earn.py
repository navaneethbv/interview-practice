NEG=-10**15
class Solution:
 def maximumAmount(self,coins):
  m,n=len(coins),len(coins[0]);dp=[[[NEG]*3 for _ in range(n)] for _ in range(m)]
  for i in range(m):
   for j in range(n):
    for used in range(3):self._enter(coins,dp,i,j,used)
  return max(dp[-1][-1])

 def _enter(self,coins,dp,i,j,used):
  """Enters (i,j) having neutralized `used` robbers; a robber here may be neutralized too."""
  v=coins[i][j];prev=self._best_before(dp,i,j,used)
  dp[i][j][used]=max(dp[i][j][used],prev+v)
  if v<0 and used<2:dp[i][j][used+1]=max(dp[i][j][used+1],prev)

 def _best_before(self,dp,i,j,used):
  if i==j==0:return 0 if used==0 else NEG
  up=dp[i-1][j][used] if i else NEG
  left=dp[i][j-1][used] if j else NEG
  return max(up,left)
