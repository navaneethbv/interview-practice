class Solution:
    def setZeroes(self, matrix):
        first_row = any(value == 0 for value in matrix[0])
        first_column = any(row[0] == 0 for row in matrix)
        self._mark_headers(matrix)
        self._clear_from_headers(matrix)
        if first_row:
            for column in range(len(matrix[0])):
                matrix[0][column] = 0
        if first_column:
            for row in matrix:
                row[0] = 0

    def _mark_headers(self, matrix):
        for row in range(1, len(matrix)):
            for column in range(1, len(matrix[0])):
                if matrix[row][column] == 0:
                    matrix[row][0] = 0
                    matrix[0][column] = 0

    def _clear_from_headers(self, matrix):
        for row in range(1, len(matrix)):
            for column in range(1, len(matrix[0])):
                if matrix[row][0] == 0 or matrix[0][column] == 0:
                    matrix[row][column] = 0
