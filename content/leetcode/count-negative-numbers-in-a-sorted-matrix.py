class Solution:
    def countNegatives(self, grid):
        column=len(grid[0])-1; total=0
        for row in grid:
            while column>=0 and row[column]<0: column-=1
            total+=len(row)-column-1
        return total
