from collections import deque

class Solution:
    def longestIncreasingPath(self, matrix):
        rows = len(matrix)
        columns = len(matrix[0])
        indegree = self._build_indegree(matrix, rows, columns)
        queue = self._initial_sources(indegree, rows, columns)

        path_length = 0
        while queue:
            path_length += 1
            for _ in range(len(queue)):
                row, column = queue.popleft()
                self._release_larger_neighbors(
                    matrix, indegree, queue, row, column
                )
        return path_length

    def _build_indegree(self, matrix, rows, columns):
        indegree = [[0] * columns for _ in range(rows)]
        for row in range(rows):
            for column in range(columns):
                indegree[row][column] = sum(
                    matrix[neighbor_row][neighbor_column] < matrix[row][column]
                    for neighbor_row, neighbor_column in self._neighbors(
                        row, column, rows, columns
                    )
                )
        return indegree

    @staticmethod
    def _initial_sources(indegree, rows, columns):
        queue = deque()
        for row in range(rows):
            for column in range(columns):
                if indegree[row][column] == 0:
                    queue.append((row, column))
        return queue

    def _release_larger_neighbors(self, matrix, indegree, queue, row, column):
        rows = len(matrix)
        columns = len(matrix[0])
        for neighbor_row, neighbor_column in self._neighbors(
            row, column, rows, columns
        ):
            if matrix[neighbor_row][neighbor_column] > matrix[row][column]:
                indegree[neighbor_row][neighbor_column] -= 1
                if indegree[neighbor_row][neighbor_column] == 0:
                    queue.append((neighbor_row, neighbor_column))

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
