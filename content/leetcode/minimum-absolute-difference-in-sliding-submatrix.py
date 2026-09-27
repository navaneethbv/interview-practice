class Solution:
 def minAbsDiff(self,grid,k):
  ans=[]
  for i in range(len(grid)-k+1):
   row=[]
   for j in range(len(grid[0])-k+1):
    a=sorted({grid[r][c] for r in range(i,i+k) for c in range(j,j+k)});row.append(min((b-a for a,b in zip(a,a[1:])),default=0))
   ans.append(row)
  return ans
