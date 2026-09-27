from collections import deque


class Solution:
    def pacificAtlantic(self, heights):
        rows = len(heights)
        columns = len(heights[0])
        pacific_starts = [(0, column) for column in range(columns)]
        pacific_starts.extend((row, 0) for row in range(rows))
        atlantic_starts = [(rows - 1, column) for column in range(columns)]
        atlantic_starts.extend((row, columns - 1) for row in range(rows))
        pacific = self._reach(heights, pacific_starts)
        atlantic = self._reach(heights, atlantic_starts)
        return [[row, column] for row in range(rows) for column in range(columns)
                if (row, column) in pacific and (row, column) in atlantic]

    def _reach(self, heights, starts):
        seen = set(starts)
        queue = deque(seen)
        while queue:
            row, column = queue.popleft()
            neighbors = ((row - 1, column), (row + 1, column),
                         (row, column - 1), (row, column + 1))
            for next_row, next_column in neighbors:
                if self._can_climb(heights, row, column, next_row, next_column, seen):
                    seen.add((next_row, next_column))
                    queue.append((next_row, next_column))
        return seen

    def _can_climb(self, heights, row, column, next_row, next_column, seen):
        return (0 <= next_row < len(heights) and 0 <= next_column < len(heights[0])
                and (next_row, next_column) not in seen
                and heights[next_row][next_column] >= heights[row][column])
