class Solution:
    def spiralOrder(self, matrix):
        top = 0
        bottom = len(matrix) - 1
        left = 0
        right = len(matrix[0]) - 1
        result = []
        while top <= bottom and left <= right:
            self._append_row(matrix, top, range(left, right + 1), result)
            top += 1
            self._append_column(matrix, right, range(top, bottom + 1), result)
            right -= 1
            if top <= bottom:
                self._append_row(matrix, bottom, range(right, left - 1, -1), result)
                bottom -= 1
            if left <= right:
                self._append_column(matrix, left, range(bottom, top - 1, -1), result)
                left += 1
        return result

    def _append_row(self, matrix, row, columns, result):
        for column in columns:
            result.append(matrix[row][column])

    def _append_column(self, matrix, column, rows, result):
        for row in rows:
            result.append(matrix[row][column])
