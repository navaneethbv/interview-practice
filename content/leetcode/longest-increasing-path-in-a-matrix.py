from collections import deque
class Solution:
    def longestIncreasingPath(self, matrix):
        rows, cols = len(matrix), len(matrix[0])
        degree = [[0]*cols for _ in range(rows)]
        queue = deque()
        for r in range(rows):
            for c in range(cols):
                degree[r][c] = sum(0<=a<rows and 0<=b<cols and matrix[a][b]<matrix[r][c] for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)))
                if degree[r][c] == 0:
                    queue.append((r,c))
        length = 0
        while queue:
            length += 1
            for _ in range(len(queue)):
                r,c = queue.popleft()
                for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                    if 0 <= a < rows and 0 <= b < cols and matrix[a][b]>matrix[r][c]:
                        degree[a][b] -= 1
                        if degree[a][b] == 0:
                            queue.append((a,b))
        return length
