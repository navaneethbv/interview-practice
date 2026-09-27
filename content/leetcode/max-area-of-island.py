class Solution:
    def maxAreaOfIsland(self, grid):
        best, rows, cols = 0, len(grid), len(grid[0])
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] != 1:
                    continue
                stack, area = [(r,c)], 0
                grid[r][c] = 0
                while stack:
                    x,y = stack.pop()
                    area += 1
                    for a,b in ((x-1,y),(x+1,y),(x,y-1),(x,y+1)):
                        if 0 <= a < rows and 0 <= b < cols and grid[a][b] == 1:
                            grid[a][b] = 0
                            stack.append((a,b))
                best = max(best, area)
        return best
