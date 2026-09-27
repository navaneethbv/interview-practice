class Solution:
    def getMaximumGold(self, grid):
        m,n=len(grid),len(grid[0])
        def visit(r,c):
            value=grid[r][c];grid[r][c]=0;best=0
            for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                if 0<=a<m and 0<=b<n and grid[a][b]:best=max(best,visit(a,b))
            grid[r][c]=value;return value+best
        return max((visit(r,c) for r in range(m) for c in range(n) if grid[r][c]),default=0)
