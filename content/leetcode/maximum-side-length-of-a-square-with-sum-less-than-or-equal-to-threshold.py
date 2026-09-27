class Solution:
    def maxSideLength(self, mat, threshold):
        rows = len(mat)
        columns = len(mat[0])
        prefix = [[0] * (columns + 1) for _ in range(rows + 1)]
        for r in range(rows):
            for c in range(columns):
                prefix[r + 1][c + 1] = (mat[r][c] + prefix[r][c + 1]
                                         + prefix[r + 1][c] - prefix[r][c])
        left = 0
        right = min(rows, columns)
        while left < right:
            middle = (left + right + 1) // 2
            if self._has_valid_square(prefix, rows, columns, middle, threshold):
                left = middle
            else:
                right = middle - 1
        return left

    def _has_valid_square(self, prefix, rows, columns, size, threshold):
        for row in range(rows - size + 1):
            for column in range(columns - size + 1):
                square_sum = (prefix[row + size][column + size]
                              - prefix[row][column + size]
                              - prefix[row + size][column]
                              + prefix[row][column])
                if square_sum <= threshold:
                    return True
        return False
