class Solution:
    def uniquePathsIII(self,grid):
        m,n=len(grid),len(grid[0]);remaining=sum(v!=-1 for row in grid for v in row)
        start=next((r,c) for r in range(m) for c in range(n) if grid[r][c]==1)
        def visit(r,c,left):
            if not(0<=r<m and 0<=c<n) or grid[r][c]==-1:return 0
            if grid[r][c]==2:return int(left==1)
            value=grid[r][c];grid[r][c]=-1
            total=sum(visit(a,b,left-1) for a,b in [(r-1,c),(r+1,c),(r,c-1),(r,c+1)])
            grid[r][c]=value;return total
        return visit(*start,remaining)
