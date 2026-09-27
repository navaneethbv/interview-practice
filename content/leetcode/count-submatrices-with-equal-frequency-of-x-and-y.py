class Solution:
 def numberOfSubmatrices(self,grid):
  n=len(grid[0]);xs=[0]*n;ys=[0]*n;ans=0
  for row in grid:
   x=y=0
   for j,c in enumerate(row):
    x+=c=='X';y+=c=='Y';xs[j]+=x;ys[j]+=y
    ans+=xs[j]>0 and xs[j]==ys[j]
  return ans
