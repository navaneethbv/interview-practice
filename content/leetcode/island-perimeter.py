class Solution:
    def islandPerimeter(self,grid):
        total=0
        for r,row in enumerate(grid):
            for c,v in enumerate(row):
                if v:
                    total+=4
                    if r and grid[r-1][c]:total-=2
                    if c and grid[r][c-1]:total-=2
        return total
