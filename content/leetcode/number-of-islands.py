class Solution:
    def numIslands(self, grid):
        seen = set()
        islands = 0
        for r in range(len(grid)):
            for c in range(len(grid[0])):
                if grid[r][c] == '1' and (r,c) not in seen:
                    islands += 1
                    self._flood(grid, r, c, seen)
        return islands

    def _flood(self, grid, r, c, seen):
        rows, cols = len(grid), len(grid[0])
        seen.add((r,c)); queue = [(r,c)]
        for x,y in queue:
            for nx,ny in ((x-1,y),(x+1,y),(x,y-1),(x,y+1)):
                if 0 <= nx < rows and 0 <= ny < cols and grid[nx][ny] == '1' and (nx,ny) not in seen:
                    seen.add((nx,ny)); queue.append((nx,ny))
