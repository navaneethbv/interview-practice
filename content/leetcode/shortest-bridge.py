from collections import deque
class Solution:
    def shortestBridge(self, grid):
        n=len(grid);start=next((r,c) for r in range(n) for c in range(n) if grid[r][c])
        island=self._island(grid,start);seen=set(island);q=deque((r,c,0) for r,c in island)
        while q:
            r,c,d=q.popleft()
            for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                if not(0<=a<n and 0<=b<n) or (a,b) in seen:continue
                if grid[a][b]:return d
                seen.add((a,b));q.append((a,b,d+1))

    def _island(self, grid, start):
        """Cells of the island containing start, in discovery order."""
        n=len(grid);stack=[start];seen={start};order=[]
        while stack:
            r,c=stack.pop();order.append((r,c))
            for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                if 0<=a<n and 0<=b<n and grid[a][b] and (a,b) not in seen:seen.add((a,b));stack.append((a,b))
        return order
