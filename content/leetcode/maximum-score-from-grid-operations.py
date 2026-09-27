class Solution:
 def maximumScore(self,grid):
  n=len(grid);neg=-10**30;dp=[[neg]*(n+1) for _ in range(n+1)];dp[0]=[0]*(n+1)
  for col in range(n):
   prefix=[0]
   for row in range(n):prefix.append(prefix[-1]+grid[row][col])
   nxt=[[neg]*(n+1) for _ in range(n+1)]
   for b in range(n+1):
    pre=[];best=neg
    for a in range(n+1):best=max(best,dp[a][b]);pre.append(best)
    suffix=[neg]*(n+2)
    for a in range(n,-1,-1):suffix[a]=max(suffix[a+1],dp[a][b]+max(0,prefix[a]-prefix[b]))
    for c in range(n+1 if col<n-1 else 1):nxt[b][c]=max(pre[c]+max(0,prefix[c]-prefix[b]),suffix[c+1])
   dp=nxt
  return max(row[0] for row in dp)
