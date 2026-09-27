class Solution:
    def maxAreaOfIsland(self, grid):
        best = 0
        for r in range(len(grid)):
            for c in range(len(grid[0])):
                if grid[r][c] == 1:
                    best = max(best, self._sink(grid, r, c))
        return best

    def _sink(self, grid, r, c):
        """Clears one island and returns its area."""
        rows, cols = len(grid), len(grid[0])
        stack, area = [(r,c)], 0
        grid[r][c] = 0
        while stack:
            x,y = stack.pop()
            area += 1
            for a,b in ((x-1,y),(x+1,y),(x,y-1),(x,y+1)):
                if 0 <= a < rows and 0 <= b < cols and grid[a][b] == 1:
                    grid[a][b] = 0
                    stack.append((a,b))
        return area
