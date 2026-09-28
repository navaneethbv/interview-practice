from collections import deque


class Solution:
    def maxDistance(self, grid):
        size = len(grid)
        queue = deque()
        seen = set()
        self._seed_land(grid, queue, seen)
        if not queue or len(queue) == size * size:
            return -1

        distance = -1
        directions = ((-1, 0), (1, 0), (0, -1), (0, 1))
        while queue:
            distance += 1
            self._expand_layer(queue, seen, size, directions)
        return distance

    def _seed_land(self, grid, queue, seen):
        for row in range(len(grid)):
            for column in range(len(grid)):
                if grid[row][column] == 1:
                    queue.append((row, column))
                    seen.add((row, column))

    def _expand_layer(self, queue, seen, size, directions):
        for _ in range(len(queue)):
            row, column = queue.popleft()
            for row_delta, column_delta in directions:
                next_row = row + row_delta
                next_column = column + column_delta
                inside = 0 <= next_row < size and 0 <= next_column < size
                if inside and (next_row, next_column) not in seen:
                    seen.add((next_row, next_column))
                    queue.append((next_row, next_column))
