class Solution:
    def findSquare(self, matrix):
        n = len(matrix)
        right, down = self._border_runs(matrix)
        for size in range(n, 0, -1):
            for row in range(n - size + 1):
                for col in range(n - size + 1):
                    top_left = min(right[row][col], down[row][col]) >= size
                    if top_left and down[row][col + size - 1] >= size and right[row + size - 1][col] >= size:
                        return size
        return 0

    @staticmethod
    def _border_runs(matrix):
        n = len(matrix)
        right = [[0] * (n + 1) for _ in range(n + 1)]
        down = [[0] * (n + 1) for _ in range(n + 1)]
        for row in range(n - 1, -1, -1):
            for col in range(n - 1, -1, -1):
                if matrix[row][col] == 1:
                    right[row][col] = right[row][col + 1] + 1
                    down[row][col] = down[row + 1][col] + 1
        return right, down
