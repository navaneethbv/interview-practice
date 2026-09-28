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
            for a, b in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                if 0 <= a < m and 0 <= b < n:
                    remaining = left - grid[a][b]
                    if remaining >= 0 and remaining > best[a][b]:
                        best[a][b] = remaining
                        q.append((a, b, remaining, d + 1))
        return -1
