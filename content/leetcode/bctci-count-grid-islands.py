class Solution:
    def countIslands(self, grid):
        seen = set()
        islands = 0
        for r in range(len(grid)):
            for c in range(len(grid[r])):
                if grid[r][c] == 1 and (r, c) not in seen:
                    islands += 1
                    self._mark_island(grid, r, c, seen)
        return islands

    @staticmethod
    def _mark_island(grid, row, col, seen):
        seen.add((row, col))
        stack = [(row, col)]
        while stack:
            row, col = stack.pop()
            for nr, nc in ((row + 1, col), (row - 1, col), (row, col + 1), (row, col - 1)):
                if 0 <= nr < len(grid) and 0 <= nc < len(grid[nr]) and grid[nr][nc] == 1 and (nr, nc) not in seen:
                    seen.add((nr, nc))
                    stack.append((nr, nc))
