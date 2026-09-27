class Solution:
    def islandPerimeter(self,grid):
        # Each land cell adds four sides; each shared edge hides two of them.
        cells=sum(map(sum,grid))
        across=sum(a and b for row in grid for a,b in zip(row,row[1:]))
        down=sum(a and b for upper,lower in zip(grid,grid[1:]) for a,b in zip(upper,lower))
        return 4*cells-2*(across+down)
