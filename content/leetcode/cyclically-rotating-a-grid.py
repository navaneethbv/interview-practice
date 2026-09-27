class Solution:
 def rotateGrid(self,grid,k):
  m,n=len(grid),len(grid[0]);out=[r[:] for r in grid]
  for d in range(min(m,n)//2):
   pos=[(d,j) for j in range(d,n-d)]+[(i,n-d-1) for i in range(d+1,m-d)]+[(m-d-1,j) for j in range(n-d-2,d-1,-1)]+[(i,d) for i in range(m-d-2,d,-1)]
   for t,(i,j) in enumerate(pos):a,b=pos[(t+k)%len(pos)];out[i][j]=grid[a][b]
  return out
