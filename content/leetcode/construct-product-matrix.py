class Solution:
 def constructProductMatrix(self,grid):
  m,n=len(grid),len(grid[0]);out=[[1]*n for _ in range(m)];p=1
  for i in range(m*n):r,c=divmod(i,n);out[r][c]=p;p=p*grid[r][c]%12345
  p=1
  for i in range(m*n-1,-1,-1):r,c=divmod(i,n);out[r][c]=out[r][c]*p%12345;p=p*grid[r][c]%12345
  return out
