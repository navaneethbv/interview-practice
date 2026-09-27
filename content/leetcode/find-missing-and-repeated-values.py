class Solution:
 def findMissingAndRepeatedValues(self,grid):
  n=len(grid);counts=[0]*(n*n+1)
  for row in grid:
   for x in row:counts[x]+=1
  return [next(x for x in range(1,n*n+1) if counts[x]==2),next(x for x in range(1,n*n+1) if counts[x]==0)]
