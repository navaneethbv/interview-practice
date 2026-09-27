from collections import deque
class Solution:
    def shortestBridge(self, grid):
        n=len(grid);start=next((r,c) for r in range(n) for c in range(n) if grid[r][c])
        stack=[start];seen={start};q=deque()
        while stack:
            r,c=stack.pop();q.append((r,c,0))
            for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                if 0<=a<n and 0<=b<n and grid[a][b] and (a,b) not in seen:seen.add((a,b));stack.append((a,b))
        while q:
            r,c,d=q.popleft()
            for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                if 0<=a<n and 0<=b<n and (a,b) not in seen:
                    if grid[a][b]:return d
                    seen.add((a,b));q.append((a,b,d+1))
