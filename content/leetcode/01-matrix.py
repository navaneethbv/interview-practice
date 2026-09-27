from collections import deque

class Solution:
    def updateMatrix(self, mat):
        rows = len(mat)
        columns = len(mat[0])
        distance = [[-1] * columns for _ in range(rows)]
        queue = deque()

        for row in range(rows):
            for column in range(columns):
                if mat[row][column] == 0:
                    distance[row][column] = 0
                    queue.append((row, column))

        while queue:
            row, column = queue.popleft()
            for neighbor_row, neighbor_column in self._neighbors(
                row, column, rows, columns
            ):
                if distance[neighbor_row][neighbor_column] == -1:
                    distance[neighbor_row][neighbor_column] = (
                        distance[row][column] + 1
                    )
                    queue.append((neighbor_row, neighbor_column))
        return distance

    @staticmethod
    def _neighbors(row, column, rows, columns):
        for neighbor_row, neighbor_column in (
            (row - 1, column),
            (row + 1, column),
            (row, column - 1),
            (row, column + 1),
        ):
            if 0 <= neighbor_row < rows and 0 <= neighbor_column < columns:
                yield neighbor_row, neighbor_column
