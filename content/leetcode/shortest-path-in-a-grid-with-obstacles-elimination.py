from collections import deque

class Solution:

    def shortestPath(self, grid, k):
        m, n = (len(grid), len(grid[0]))
        best = [[-1] * n for _ in range(m)]
        best[0][0] = k
        q = deque([(0, 0, k, 0)])
        while q:
            r, c, left, d = q.popleft()
            if r == m - 1 and c == n - 1:
                return d
            self._visit_neighbors(grid, best, q, r, c, left, d)
        return -1

    def _visit_neighbors(self, grid, best, q, row, column, left, distance):
        rows, columns = len(grid), len(grid[0])
        for next_row, next_column in (
            (row - 1, column),
            (row + 1, column),
            (row, column - 1),
            (row, column + 1),
        ):
            if not (0 <= next_row < rows and 0 <= next_column < columns):
                continue
            remaining = left - grid[next_row][next_column]
            if remaining < 0 or remaining <= best[next_row][next_column]:
                continue
            best[next_row][next_column] = remaining
            q.append((next_row, next_column, remaining, distance + 1))
