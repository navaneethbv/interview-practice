class Solution:
    def numberOfSubmatrices(self, grid):
        columns = len(grid[0])
        x_totals = [0] * columns
        y_totals = [0] * columns
        answer = 0
        for row in grid:
            answer += self._process_row(row, x_totals, y_totals)
        return answer

    def _process_row(self, row, x_totals, y_totals):
        x_count = 0
        y_count = 0
        answer = 0
        for column, value in enumerate(row):
            x_count += value == 'X'
            y_count += value == 'Y'
            x_totals[column] += x_count
            y_totals[column] += y_count
            if x_totals[column] and x_totals[column] == y_totals[column]:
                answer += 1
        return answer
