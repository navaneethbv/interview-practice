from collections import deque
class Solution:
    def getFood(self, grid):
        m,n=len(grid),len(grid[0])
        start=next((r,c) for r in range(m) for c in range(n) if grid[r][c]=='*')
        q=deque([(*start,0)]);seen={start}
        while q:
            r,c,d=q.popleft()
            if grid[r][c]=='#':return d
            for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                if 0<=a<m and 0<=b<n and grid[a][b]!='X' and (a,b) not in seen:
                    seen.add((a,b));q.append((a,b,d+1))
        return -1
