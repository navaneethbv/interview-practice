class Solution:
    def numMagicSquaresInside(self, grid):
        count=0
        for r in range(len(grid)-2):
            for c in range(len(grid[0])-2):
                a=[row[c:c+3] for row in grid[r:r+3]]
                if sorted(value for row in a for value in row)!=list(range(1,10)): continue
                lines=[sum(row) for row in a]+[sum(a[i][j] for i in range(3)) for j in range(3)]+[sum(a[i][i] for i in range(3)),sum(a[i][2-i] for i in range(3))]
                count+=all(total==15 for total in lines)
        return count
