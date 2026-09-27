class Solution:
    def containsCycle(self, grid):
        seen=set()
        for r in range(len(grid)):
            for c in range(len(grid[0])):
                if (r,c) not in seen and self._cycle_from(grid,r,c,seen):return True
        return False

    def _cycle_from(self, grid, r, c, seen):
        """DFS over same-valued cells; reaching a seen cell other than the parent closes a cycle."""
        m,n=len(grid),len(grid[0])
        seen.add((r,c));stack=[(r,c,-1,-1)]
        while stack:
            a,b,pr,pc=stack.pop()
            for x,y in ((a-1,b),(a+1,b),(a,b-1),(a,b+1)):
                if not(0<=x<m and 0<=y<n) or grid[x][y]!=grid[a][b] or (x,y)==(pr,pc):continue
                if (x,y) in seen:return True
                seen.add((x,y));stack.append((x,y,a,b))
        return False
