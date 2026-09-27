import heapq


class Solution:
    def minimumEffortPath(self, heights):
        rows = len(heights)
        columns = len(heights[0])
        best = [[float('inf')] * columns for _ in range(rows)]
        best[0][0] = 0
        pending = [(0, 0, 0)]
        while pending:
            current = heapq.heappop(pending)
            effort, row, column = current
            if effort != best[row][column]:
                continue
            if row == rows - 1 and column == columns - 1:
                return effort
            for row_step, column_step in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                self._relax(heights, best, pending, current,
                            row + row_step, column + column_step)
        return 0

    def _relax(self, heights, best, pending, current, next_row, next_column):
        if not (0 <= next_row < len(heights) and 0 <= next_column < len(heights[0])):
            return
        effort, row, column = current
        candidate = max(effort, abs(heights[row][column] - heights[next_row][next_column]))
        if candidate < best[next_row][next_column]:
            best[next_row][next_column] = candidate
            heapq.heappush(pending, (candidate, next_row, next_column))
