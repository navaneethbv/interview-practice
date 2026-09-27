class Solution:
    def largestIsland(self, grid):
        n=len(grid);sizes={0:0};label=2
        for r in range(n):
            for c in range(n):
                if grid[r][c]==1:sizes[label]=self._label(grid,r,c,label);label+=1
        best=max(sizes.values())
        for r in range(n):
            for c in range(n):
                if grid[r][c]==0:best=max(best,self._joined(grid,sizes,r,c))
        return best

    def _label(self, grid, r, c, label):
        """Marks one island with its label and returns its size."""
        n=len(grid);stack=[(r,c)];grid[r][c]=label;size=0
        while stack:
            a,b=stack.pop();size+=1
            for x,y in ((a-1,b),(a+1,b),(a,b-1),(a,b+1)):
                if 0<=x<n and 0<=y<n and grid[x][y]==1:grid[x][y]=label;stack.append((x,y))
        return size

    def _joined(self, grid, sizes, r, c):
        n=len(grid)
        nearby={grid[a][b] for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)) if 0<=a<n and 0<=b<n}
        return 1+sum(sizes[i] for i in nearby)
