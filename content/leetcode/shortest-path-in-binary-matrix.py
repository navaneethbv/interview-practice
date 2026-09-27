from collections import deque
class Solution:
    def shortestPathBinaryMatrix(self, grid):
        n=len(grid)
        if grid[0][0] or grid[-1][-1]:return -1
        q=deque([(0,0,1)]);seen={(0,0)}
        while q:
            r,c,d=q.popleft()
            if r==c==n-1:return d
            for a in range(r-1,r+2):
                for b in range(c-1,c+2):
                    if 0<=a<n and 0<=b<n and grid[a][b]==0 and (a,b) not in seen:seen.add((a,b));q.append((a,b,d+1))
        return -1
