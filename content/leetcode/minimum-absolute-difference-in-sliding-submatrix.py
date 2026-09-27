class Solution:
    def minAbsDiff(self, grid, k):
        rows = len(grid) - k + 1
        columns = len(grid[0]) - k + 1
        answer = []
        for top in range(rows):
            result_row = []
            for left in range(columns):
                values = self._window_values(grid, top, left, k)
                result_row.append(self._closest_gap(values))
            answer.append(result_row)
        return answer

    def _window_values(self, grid, top, left, size):
        return sorted({
            grid[row][column]
            for row in range(top, top + size)
            for column in range(left, left + size)
        })

    def _closest_gap(self, values):
        if len(values) < 2:
            return 0
        return min(right - left for left, right in zip(values, values[1:]))
