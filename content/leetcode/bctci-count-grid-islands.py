class Solution:
    def _visit_island(self, grid, start, seen):
        seen.add(start)
        stack = [start]
        while stack:
            row, col = stack.pop()
            for nr, nc in ((row + 1, col), (row - 1, col), (row, col + 1), (row, col - 1)):
                if not (0 <= nr < len(grid) and 0 <= nc < len(grid[nr])):
                    continue
                if grid[nr][nc] == 1 and (nr, nc) not in seen:
                    seen.add((nr, nc))
                    stack.append((nr, nc))

    def countIslands(self, grid):
        seen = set()
        islands = 0
        for row, cells in enumerate(grid):
            for col, cell in enumerate(cells):
                if cell == 1 and (row, col) not in seen:
                    islands += 1
                    self._visit_island(grid, (row, col), seen)
        return islands
