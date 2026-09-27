from collections import deque
class Solution:
    def shortestDistance(self,grid):
        m,n=len(grid),len(grid[0]);distance=[[0]*n for _ in range(m)];reach=[[0]*n for _ in range(m)];buildings=0
        for r in range(m):
            for c in range(n):
                if grid[r][c]==1:buildings+=1;self._spread(grid,r,c,distance,reach)
        return min((distance[r][c] for r in range(m) for c in range(n) if grid[r][c]==0 and reach[r][c]==buildings),default=-1)

    def _spread(self, grid, r, c, distance, reach):
        """BFS from one building over empty land, adding its distance to each reachable cell."""
        m,n=len(grid),len(grid[0]);q=deque([(r,c,0)]);seen={(r,c)}
        while q:
            x,y,d=q.popleft()
            for a,b in [(x-1,y),(x+1,y),(x,y-1),(x,y+1)]:
                if 0<=a<m and 0<=b<n and grid[a][b]==0 and (a,b) not in seen:
                    seen.add((a,b));distance[a][b]+=d+1;reach[a][b]+=1;q.append((a,b,d+1))
