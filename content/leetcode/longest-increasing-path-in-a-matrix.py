from collections import deque
class Solution:
    def longestIncreasingPath(self, matrix):
        rows, cols = len(matrix), len(matrix[0])
        degree = [[sum(matrix[a][b] < matrix[r][c] for a,b in self._neighbors(r,c,rows,cols)) for c in range(cols)] for r in range(rows)]
        queue = deque((r,c) for r in range(rows) for c in range(cols) if degree[r][c] == 0)
        length = 0
        while queue:
            length += 1
            for _ in range(len(queue)):
                r,c = queue.popleft()
                self._release(matrix, degree, queue, r, c)
        return length

    def _release(self, matrix, degree, queue, r, c):
        """Removes (r,c) from its larger neighbours' in-degrees, queueing any that become sources."""
        for a,b in self._neighbors(r,c,len(matrix),len(matrix[0])):
            if matrix[a][b] > matrix[r][c]:
                degree[a][b] -= 1
                if degree[a][b] == 0:
                    queue.append((a,b))

    @staticmethod
    def _neighbors(r, c, rows, cols):
        for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
            if 0 <= a < rows and 0 <= b < cols:
                yield a,b
