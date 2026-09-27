class Solution:
    def setZeroes(self, matrix):
        rows,cols = len(matrix),len(matrix[0])
        first_row = any(x == 0 for x in matrix[0])
        first_col = any(matrix[r][0] == 0 for r in range(rows))
        self._mark_headers(matrix)
        self._clear_from_headers(matrix)
        if first_row:
            for c in range(cols): matrix[0][c] = 0
        if first_col:
            for r in range(rows): matrix[r][0] = 0

    def _mark_headers(self, matrix):
        """Records each zero in the first row and column, which are saved beforehand."""
        for r in range(1,len(matrix)):
            for c in range(1,len(matrix[0])):
                if matrix[r][c] == 0:
                    matrix[r][0] = matrix[0][c] = 0

    def _clear_from_headers(self, matrix):
        for r in range(1,len(matrix)):
            for c in range(1,len(matrix[0])):
                if matrix[r][0] == 0 or matrix[0][c] == 0:
                    matrix[r][c] = 0
