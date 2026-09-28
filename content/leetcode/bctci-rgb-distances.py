from collections import deque


class Solution:
    TARGET = {"R": "G", "G": "B", "B": "R"}

    def rgbDistances(self, screen):
        distance_to = {color: self._distances(screen, color) for color in "RGB"}
        return [[distance_to[self.TARGET[pixel]][r][c] for c, pixel in enumerate(row)] for r, row in enumerate(screen)]

    def _distances(self, screen, color):
        rows, cols = len(screen), len(screen[0])
        distance = [[-1] * cols for _ in range(rows)]
        queue = deque()
        for r in range(rows):
            for c in range(cols):
                if screen[r][c] == color:
                    distance[r][c] = 0
                    queue.append((r, c))
        while queue:
            r, c = queue.popleft()
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < rows and 0 <= nc < cols and distance[nr][nc] == -1:
                    distance[nr][nc] = distance[r][c] + 1
                    queue.append((nr, nc))
        return distance
