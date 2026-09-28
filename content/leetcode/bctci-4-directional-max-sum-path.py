class Solution:
    def maxSimplePathSum(self, grid):
        rows, cols = len(grid), len(grid[0])
        visited = [[False] * cols for _ in range(rows)]
        best = [None]

        def walk(r, c, total):
            if (r, c) == (rows - 1, cols - 1):
                best[0] = total if best[0] is None else max(best[0], total)
                return
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc]:
                    visited[nr][nc] = True
                    walk(nr, nc, total + grid[nr][nc])
                    visited[nr][nc] = False

        visited[0][0] = True
        walk(0, 0, grid[0][0])
        return best[0]
