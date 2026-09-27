class Solution:
    def largestMagicSquare(self, grid):
        m,n=len(grid),len(grid[0]);rows=[[0]*(n+1) for _ in range(m)];cols=[[0]*n for _ in range(m+1)]
        for r in range(m):
            for c in range(n):rows[r][c+1]=rows[r][c]+grid[r][c];cols[r+1][c]=cols[r][c]+grid[r][c]
        for size in range(min(m,n),1,-1):
            if any(self._magic(grid,rows,cols,r,c,size) for r in range(m-size+1) for c in range(n-size+1)):return size
        return 1

    def _magic(self, grid, rows, cols, r, c, size):
        """Checks every row, column and both diagonals of one square using prefix sums."""
        target=rows[r][c+size]-rows[r][c]
        if any(rows[a][c+size]-rows[a][c]!=target for a in range(r,r+size)):return False
        if any(cols[r+size][b]-cols[r][b]!=target for b in range(c,c+size)):return False
        main=sum(grid[r+i][c+i] for i in range(size));anti=sum(grid[r+i][c+size-1-i] for i in range(size))
        return main==target==anti
