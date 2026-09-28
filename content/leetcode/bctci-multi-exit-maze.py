from collections import deque


class Solution:
    def exitDistances(self, maze):
        rows, cols = len(maze), len(maze[0])
        distance = [[-1] * cols for _ in range(rows)]
        queue = deque()
        for r in range(rows):
            for c in range(cols):
                if maze[r][c] == "O":
                    distance[r][c] = 0
                    queue.append((r, c))
        while queue:
            r, c = queue.popleft()
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < rows and 0 <= nc < cols and maze[nr][nc] != "X" and distance[nr][nc] == -1:
                    distance[nr][nc] = distance[r][c] + 1
                    queue.append((nr, nc))
        return distance
