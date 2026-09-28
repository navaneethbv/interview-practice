class Solution:
    def _black_runs(self, matrix):
        n = len(matrix)
        right = [[0] * (n + 1) for _ in range(n + 1)]
        down = [[0] * (n + 1) for _ in range(n + 1)]
        for row in range(n - 1, -1, -1):
            for col in range(n - 1, -1, -1):
                if matrix[row][col] == 1:
                    right[row][col] = right[row][col + 1] + 1
                    down[row][col] = down[row + 1][col] + 1
        return right, down

    def _has_square(self, size, right, down):
        positions = len(right) - size
        for row in range(positions):
            for col in range(positions):
                borders = (right[row][col], down[row][col],
                           down[row][col + size - 1], right[row + size - 1][col])
                if min(borders) >= size:
                    return True
        return False

    def findSquare(self, matrix):
        right, down = self._black_runs(matrix)
        for size in range(len(matrix), 0, -1):
            if self._has_square(size, right, down):
                return size
        return 0
